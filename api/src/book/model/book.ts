import { Field, Int, ObjectType } from 'type-graphql'

@ObjectType()
export class Book {
  @Field(type => Int)
  id: number = 0

  @Field(type => String)
  title: string = ''

  @Field({ nullable: true })
  description?: string
}
