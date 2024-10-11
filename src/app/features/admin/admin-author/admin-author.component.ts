import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Author } from 'src/app/core/models/author.model';
import { AuthorParams } from 'src/app/core/models/params.model';
import { AuthorService } from 'src/app/core/services/author.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-author',
  templateUrl: './admin-author.component.html',
  styleUrls: ['./admin-author.component.css']
})
export class AdminAuthorComponent implements OnInit {

  searchTerm: string = ''
  authorList: Author[] = []
  adminAuthorParams = new AuthorParams()
  totalAuthors = 0
  columns = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Tác giả' },
  ]
  actions = [
    {
      label: 'Cập nhật',
      icon: 'edit',
      tooltip: 'Chỉnh sửa tên tác giả',
      action: (row: any) => {
        console.log(row)
      }
    },
    {
      label: 'Xóa',
      icon: 'delete',
      tooltip: 'Xóa tác giả',
      action: (row: any) => {
        console.log(row)
      }

    }
  ]
  
  constructor(private authorService: AuthorService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllAuthorsForAdmin()
  }

  getAllAuthorsForAdmin() {
    this.authorService.getAuthorsForAdmin(this.adminAuthorParams).subscribe({
      next: reponse => {
        if (reponse.data) {
          this.authorList = reponse.data
          this.totalAuthors = reponse.count
        }
      }
    })
  }

  onPageChange(event: PageEvent) {
    this.adminAuthorParams.pageIndex = event.pageIndex + 1
    this.adminAuthorParams.pageSize = event.pageSize
    this.getAllAuthorsForAdmin()
  }

  onSearch() {
    this.adminAuthorParams.search = this.searchTerm
    this.adminAuthorParams.pageIndex = 1
    this.getAllAuthorsForAdmin()
  }

  onReset() {
    if (this.searchTerm) this.searchTerm = ''
    this.adminAuthorParams = new AuthorParams()
    this.getAllAuthorsForAdmin()
  }

}
