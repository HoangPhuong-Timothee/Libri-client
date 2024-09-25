import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { Address } from '../models/address.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<User[]>(`${environment.baseAPIUrl}/api/Users`)
  }

  getUserAddress() {
    return this.http.get<Address>(`${environment.baseAPIUrl}/api/Users/address`)
  }

  modifyUserAddress(address: Address) {
    return this.http.post(`${environment.baseAPIUrl}/api/Users/address`, address)
  }
}
