import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from "rxjs";
import { environment } from 'src/environments/environment';
import { AddBookStoreRequest, BookStore, UpdateBookStoreRequest } from '../models/book-store.model';
import { Pagination } from '../models/pagination.model';
import { BookStoreParams } from '../models/params.model';

@Injectable({
  providedIn: 'root'
})
export class BookstoreService {

  bookStores: BookStore[] = []
  bookStoresList: BookStore[] = []
  bookStorePagination?: Pagination<BookStore[]>
  bookStoreParams = new BookStoreParams()
  bookStoreCache = new Map<string, Pagination<BookStore[]>>()

  constructor(private http: HttpClient) { }

  getAllBookStoresForAdmin(useCache = true): Observable<Pagination<BookStore[]>> {
    if (!useCache) {
      this.bookStoreCache = new Map()
    }
    if (this.bookStoreCache.size > 0 && useCache) {
      if (this.bookStoreCache.has(Object.values(this.bookStoreParams).join('-'))) {
        this.bookStorePagination = this.bookStoreCache.get(Object.values(this.bookStoreParams).join('-'))

        if(this.bookStorePagination) {
          return of(this.bookStorePagination)
        }
      }
    }
    let params = new HttpParams()
    if (this.bookStoreParams.search) params = params.append('search', this.bookStoreParams.search)
    params = params.append('pageIndex', this.bookStoreParams.pageIndex)
    params = params.append('pageSize', this.bookStoreParams.pageSize)
    return this.http.get<Pagination<BookStore[]>>(`${environment.baseAPIUrl}/api/BookStores/admin/bookstores-list`, { params }).pipe(
      map(response => {
        this.bookStoresList = [...this.bookStoresList, ...response.data]
        this.bookStorePagination = response
        return response
      })
    )
  }

  setBookStoreParams(params: BookStoreParams) {
    this.bookStoreParams = params
  }

  getBookStoreParams() {
    return this.bookStoreParams
  }

  getAllBookStores(): Observable<BookStore[]> {
    if (this.bookStores.length > 0) {
      return of(this.bookStores)
    }
    return this.http.get<BookStore[]>(`${environment.baseAPIUrl}/api/BookStores`).pipe(
      map(response => this.bookStores = response)
    )
  }

  addNewBookStore(request: AddBookStoreRequest) {
    return this.http.post(`${environment.baseAPIUrl}/api/BookStores`, request)
  }

  importBookStoresFromFile(file: File) {
    const formData = new FormData()
    formData.append('file', file, file.name)
    return this.http.post(`${environment.baseAPIUrl}/api/BookStores/import-from-file`, formData, {
      reportProgress: true,
      observe: 'events'
    })
  }

  updateBookStore(request: UpdateBookStoreRequest) {
    return this.http.put(`${environment.baseAPIUrl}/api/Genres/${request.id}`, request.storeName)
  }

  deleteBookStore(id: number) {
     return this.http.delete(`${environment.baseAPIUrl}/api/BookStores/${id}`)
  }

  checkBookStoreExistByStoreName(storeName: string) {
    return this.http.get(`${environment.baseAPIUrl}/api/BookStores/bookstore-exists?storeName=${storeName}`)
  }

}
