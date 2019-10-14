import { Field, Int, ObjectType } from 'type-graphql'

@ObjectType()
export class Book {
  @Field(type => String)
  id: string

  @Field(type => String)
  title: string = ''

  @Field({ nullable: true })
  description?: string
}
