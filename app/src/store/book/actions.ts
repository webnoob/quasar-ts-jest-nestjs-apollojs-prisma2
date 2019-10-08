import { IRootState } from '../types';
import { ActionTree } from 'vuex';
import { IBookState } from './types';
import Book from 'src/modules/book/book.model';
import bookService from 'src/modules/book/book.service';
import BookCrudDto from 'src/modules/book/dto/book.crud.dto';

export const actions: ActionTree<IBookState, IRootState> = {
  create ({ commit }, dto: BookCrudDto): Promise<Book> {
    return bookService.create(dto)
  }
}