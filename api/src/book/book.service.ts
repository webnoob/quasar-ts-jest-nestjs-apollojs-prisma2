import { Injectable } from '@nestjs/common'
import { BookArgs } from './dto/book.args'
import { Book } from './model/book'
import BookCrudDto from './dto/book.crud.dto'
import { PhotonService } from '../photon/photon.service'

@Injectable()
export class BookService {
  constructor (private readonly photonService: PhotonService) { }

  findAll (args: BookArgs): Promise<Book[]> {
    return this.photonService.books.findMany()
  }

  create (newBookData: BookCrudDto) {
    return this.photonService.books.create({
      data: {
        title: newBookData.title
      }
    })
  }

  delete (id: string) {
    return Promise.resolve()
  }
}
