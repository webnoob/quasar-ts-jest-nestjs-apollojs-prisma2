import { Max, Min } from 'class-validator'
import { ArgsType, Field, Int } from 'type-graphql'

@ArgsType()
export class BookArgs {
  @Field(type => Int)
  @Min(0)
  skip: number = 0

  @Field(type => Int)
  @Min(1)
  @Max(50)
  take: number = 25
}
