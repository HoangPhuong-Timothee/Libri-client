import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BookParams } from '../models/book-param.model';
import { Pagination } from '../models/pagination.model';
import { Book } from '../models/book.model';

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
}
