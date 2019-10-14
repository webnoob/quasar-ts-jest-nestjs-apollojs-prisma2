import { MaxLength } from 'class-validator'
import { ArgsType, Field, Int } from 'type-graphql'

@ArgsType()
export default class BookCrudDto {
  @Field({ nullable: true })
  id?: string

  @Field(type => String)
  @MaxLength(200)
  title: string = ''

  @Field({ nullable: true })
  description?: string
}
