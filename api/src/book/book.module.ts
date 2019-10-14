import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { BookResolver } from './book.resolver'
import { PhotonService } from '../photon/photon.service'

@Module({
  controllers: [BookController],
  providers: [BookService, BookResolver, PhotonService]
})
export class BookModule {}
