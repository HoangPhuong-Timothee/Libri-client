import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddBookRequest, Book, UpdateBookRequest } from '../models/book.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  createBook(model: AddBookRequest) {
    return this.http.post<Book>(`${environment.baseAPIUrl}/api/Books/`, model)
  }

  updateBook(model: UpdateBookRequest) {
    return this.http.put<Book>(`${environment.baseAPIUrl}/api/Books/${model.id}`, model)
  }

  deleteBook(id: number) {
    return this.http.delete(`${environment.baseAPIUrl}/api/Books/${id}`)
  }

  updateStock(id: number, newQuantity: number) {
    return this.http.put(`${environment.baseAPIUrl}/api/Books/stocks/${id}`, newQuantity) 
  }
}
