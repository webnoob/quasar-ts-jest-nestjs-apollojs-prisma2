/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import * as All from 'quasar'
import BookComponent from '../components/book.component'
import { VueConstructor } from 'vue/types/vue';

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

describe('Mount Quasar', () => {
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

  /*
  it('creates a book', async () => {
    vm.title = 'Alakazam!'
    const book = await vm.save()
    console.log('Title: ', book.title)
    expect(book.title).toBe('Alakazams!')
  })
   */
})
