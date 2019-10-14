import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { BookModule } from './book/book.module'

@Module({
  imports: [
    BookModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'graphql/schema.gql',
      debug: true,
      playground: true,
      context: ({ req }) => ({ req })
    })
  ]
})
export class AppModule {}
