import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { Address } from '../models/address.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = `${environment.baseAPIUrl}/api/Users`

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<User[]>(this.apiUrl)
  }

  getUserAddress() {
    return this.http.get<Address>(`${this.apiUrl}/address`)
  }

  modifyUserAddress(address: Address) {
    return this.http.post<Address>(`${this.apiUrl}/address`, address)
  }
}
