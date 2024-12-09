import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Address } from '../models/address.model';
import { Pagination } from '../models/pagination.model';
import { MemberParams } from '../models/params.model';
import {Member, ModifyProfileRequest, User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsersList(memberParams: MemberParams) {
    let params = new HttpParams()
    params = params.append('pageIndex', memberParams.pageIndex)
    params = params.append('pageSize', memberParams.pageSize)
    return this.http.get<Pagination<Member[]>>(`${environment.baseAPIUrl}/api/Users/admin/users-list`, { params })
  }

  modifyUserInfo(request: ModifyProfileRequest) {
    return this.http.put(`${environment.baseAPIUrl}/api/Users/profile`, request)
  }

  getUserAddress() {
    return this.http.get<Address>(`${environment.baseAPIUrl}/api/Users/address`)
  }

  modifyUserAddress(address: Address) {
    return this.http.put<Address>(`${environment.baseAPIUrl}/api/Users/address`, address)
  }
}
