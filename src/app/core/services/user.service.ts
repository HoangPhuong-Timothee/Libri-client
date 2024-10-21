import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Address } from '../models/address.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserInfo() {
    return this.http.get<User>(`${environment.baseAPIUrl}/api/Users/info`)
  }

  getUserAddress() {
    return this.http.get<Address>(`${environment.baseAPIUrl}/api/Users/address`)
  }

  modifyUserAddress(address: Address) {
    return this.http.put<Address>(`${environment.baseAPIUrl}/api/Users/address`, address)
  }
}
