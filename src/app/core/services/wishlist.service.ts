import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private http: HttpClient) { }

  getUserWishlist() {
    return this.http.get<Book[]>(`${environment.baseAPIUrl}/api/Users/wishlist`)
  }
}