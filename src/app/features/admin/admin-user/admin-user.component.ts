import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MemberParams } from 'src/app/core/models/params.model';
import { Member } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {

  memberList: Member[] = []
  adminMemberParams = new MemberParams()
  totalUsers = 0
  columns = [
    { field: 'id', header: 'ID' },
    { field: ['email', 'imageUrl'], header: 'Email', haveImage: true },
    { field: 'dateOfBirth', header: 'Ngày sinh' },
    { field: 'gender', header: 'Giới tính' },
    { field: 'phoneNumber', header: 'Số điện thoại' },
    { field: 'address', header: 'Địa chỉ' },
    { field: 'roles', header: 'Vai trò' }
  ]

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUsersList()
  }

  getUsersList() {
    this.userService.getUsersList(this.adminMemberParams).subscribe({
      next: response => {
        if (response.data) {
          this.memberList = response.data
          this.totalUsers = response.count
        }
      }
    })
  }

  onPageChange(event: PageEvent) {
    this.adminMemberParams.pageIndex = event.pageIndex + 1
    this.adminMemberParams.pageSize = event.pageSize
    this.getUsersList()
  }

}
