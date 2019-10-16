import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { BookModule } from './book/book.module'
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    BookModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'graphql/schema.gql',
      debug: true,
      playground: true,
      context: ({ req }) => ({ req })
    }),
    AuthModule,
    UserModule
  ]
})
export class AppModule {}
