import { Field, Int, ObjectType } from 'type-graphql'

@ObjectType()
export class User {
  @Field(type => String)
  id: string

  @Field(type => String)
  username: string = ''

  @Field(type => String)
  emailAddress: string

  @Field(type => String)
  password: string
}
