import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AddBookRequest, Book, UpdateBookRequest } from '../models/book.model';
import { Pagination } from '../models/pagination.model';
import { BookParams } from '../models/params.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getAllBooks(bookParams: BookParams) {
    let params = new HttpParams()
    if (bookParams.genreId) params = params.append('genreId', bookParams.genreId)
    if (bookParams.publisherId) params = params.append('publisherId', bookParams.publisherId)
    if (bookParams.search) params = params.append('search', bookParams.search)
    params = params.append('sort', bookParams.sort)
    params = params.append('pageIndex', bookParams.pageIndex)
    params = params.append('pageSize', bookParams.pageSize)
    return this.http.get<Pagination<Book[]>>(`${environment.baseAPIUrl}/api/Books`, { params })
  }

  getSingleBook(id: number) {
    return this.http.get<Book>(`${environment.baseAPIUrl}/api/Books/${id}`)
  }

  getSimilarBook(id: number) {
    return this.http.get<Book[]>(`${environment.baseAPIUrl}/api/Books/${id}/similar`)
  }

  getLatestBook() {
    return this.http.get<Book[]>(`${environment.baseAPIUrl}/api/Books/latest`)
  }

  addNewBook(model: AddBookRequest) {
    return this.http.post(`${environment.baseAPIUrl}/api/Books/`, model)
  }

  importBooksFromFile(file: File) {
    const formData = new FormData()
    formData.append('file', file, file.name)
    return this.http.post(`${environment.baseAPIUrl}/api/Books/import`, formData, { reportProgress: true, observe: 'events' })
  }

  updateBook(model: UpdateBookRequest) {
    return this.http.put(`${environment.baseAPIUrl}/api/Books/${model.id}`, model)
  }

  updateQuantityInStock(id: number, quantity: number) {
    return this.http.put(`${environment.baseAPIUrl}/api/Books/stocks/${id}`, quantity)
  }

  deleteBook(id: number) {
    return this.http.delete(`${environment.baseAPIUrl}/api/Books/${id}`)
  }

}
