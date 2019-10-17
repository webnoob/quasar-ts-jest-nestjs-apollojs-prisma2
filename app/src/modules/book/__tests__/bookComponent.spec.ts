/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import 'reflect-metadata'
import { container } from 'inversify-props'
container.unbindAll()

import { mount, createLocalVue } from '@vue/test-utils'
import * as All from 'quasar'
import { VueConstructor } from 'vue/types/vue'

import IBookService from '../book.service.interface'
import BookCrudDto from '../dto/bookCrud.dto'
import Book from '../book.model'
import BookService from './fakes/book.service.mock'
import BookComponent from '../components/book.component'
import IApolloClientService from '../../_base/apollo/apolloClient.service.interface'
import ApolloClientService from '../../_base/apollo/__tests__/fakes/apolloClient.service.mock'

// import langEn from 'quasar/lang/en-us' // change to any language you wish! => this breaks wallaby :(
const { Quasar, date } = All

function isComponent(value: any): value is VueConstructor {
  return value && value.component && value.component.name != null
}

const components = Object.keys(All).reduce<{ [index: string]: VueConstructor }>(
  (object, key) => {
    const val = (All as any)[key]
    if (isComponent(val)) {
      object[key] = val
    }
    return object
  }, {}
)

describe('Test Book Component', () => {
  container.addSingleton<IApolloClientService>(ApolloClientService)
  container.addTransient<IBookService<BookCrudDto, Book>>(BookService)

  const localVue = createLocalVue()
  localVue.use(Quasar, { components }) // , lang: langEn

  const wrapper = mount(BookComponent, {
    localVue
  })
  const vm: BookComponent = wrapper.vm

  it('passes the sanity check and creates a wrapper', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('has our heading on', () => {
    expect(wrapper.find('h1').text()).toContain('Adding a book!')
  })

  it('creates a book', async () => {
    vm.title = 'Alakazam!'
    const book = await vm.saveBook()
    expect(book.title).toBe('Alakazam!')
  })
})
