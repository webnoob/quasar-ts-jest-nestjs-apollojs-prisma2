import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { BookModule } from './book/book.module'

@Module({
  imports: [
    BookModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'src/graphql/schema.gql'
    })
  ]
})
export class AppModule {}
