import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from "rxjs";
import { environment } from 'src/environments/environment';
import { BookStore } from '../models/book-store.model';

@Injectable({
  providedIn: 'root'
})
export class BookstoreService {

  bookStore: BookStore[] = []

  constructor(private http: HttpClient) { }

  getAllBookStores() {
    if (this.bookStore.length > 0) {
      return of(this.bookStore)
    }
    return this.http.get<BookStore[]>(`${environment.baseAPIUrl}/api/BookStores`)
  }

  importBookStoresFromFile(file: File) {
    const formData = new FormData()
    formData.append('file', file, file.name)
    return this.http.post(`${environment.baseAPIUrl}/api/BookStores/import-from-file`, formData, {
      reportProgress: true,
      observe: 'events'
    })
  }

  deleteBookStore(id: number) {
     return this.http.delete(`${environment.baseAPIUrl}/api/BookStores/${id}`)
  }

}
