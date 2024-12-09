import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Author } from 'src/app/core/models/author.model';
import { AuthorParams } from 'src/app/core/models/params.model';
import { AuthorService } from 'src/app/core/services/author.service';
import { DialogService } from 'src/app/core/services/dialog.service';
import { AddAuthorFormComponent } from './add-author-form/add-author-form.component';
import { EditAuthorFormComponent } from './edit-author-form/edit-author-form.component';

@Component({
  selector: 'app-admin-author',
  templateUrl: './admin-author.component.html',
  styleUrls: ['./admin-author.component.css']
})
export class AdminAuthorComponent implements OnInit {

  searchTerm: string = ''
  authorList: Author[] = []
  adminAuthorParams: AuthorParams
  totalAuthors = 0
  columns = [
    { field: 'id', header: 'Mã tác giả' },
    { field: 'name', header: 'Tác giả' },
    { field: 'createInfo', header: 'Thông tin tạo' },
    { field: 'updateInfo', header: 'Thông tin cập nhật' }
  ]
  actions = [
    {
      label: 'Cập nhật',
      icon: 'edit',
      tooltip: 'Chỉnh sửa tên tác giả',
      action: (row: any) => {
        this.openUpdateAuthorDialog(row)
      }
    },
    {
      label: 'Xóa',
      icon: 'delete',
      tooltip: 'Xóa tác giả',
      action: (row: any) => {
        this.openDeleteAuthorDialog(row)
      }

    }
  ]

  constructor(
    private authorService: AuthorService,
    private dialog: MatDialog,
    private dialogService: DialogService
  )
  {
    this.searchTerm = ''
    this.adminAuthorParams = authorService.getAuthorParams()
  }

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    this.getAllAuthorsForAdmin()
  }

  getAllAuthorsForAdmin() {
    this.authorService.getAuthorsForAdmin().subscribe({
      next: reponse => {
        this.authorList = reponse.data
        this.totalAuthors = reponse.count
      },
      error: error => {
        console.log(error)
      }
    })
  }

  onPageChange(event: PageEvent) {
    const params = this.authorService.getAuthorParams()
    params.pageIndex = event.pageIndex + 1
    params.pageSize = event.pageSize
    this.authorService.setAuthorParams(params)
    this.adminAuthorParams = params
    this.getAllAuthorsForAdmin()
  }

  onSearch() {
    const params = this.authorService.getAuthorParams()
    params.search = this.searchTerm
    params.pageIndex = 1
    this.authorService.setAuthorParams(params)
    this.adminAuthorParams = params
    this.getAllAuthorsForAdmin()
  }

  onReset() {
    if (this.searchTerm) {
      this.searchTerm = ''
    }
    this.adminAuthorParams = new AuthorParams()
    this.authorService.setAuthorParams(this.adminAuthorParams)
    this.getAllAuthorsForAdmin()
  }

  openAddNewAuthorDialog() {
    const dialog = this.dialog.open(AddAuthorFormComponent, {
      minWidth: '500px',
      data: {
        title: 'Thêm tác giả'
      }
    })
    dialog.afterClosed().subscribe({
      next: (result) => {
        if (result && result.success) {
          const params = this.authorService.getAuthorParams()
          params.pageIndex = 1
          this.authorService.setAuthorParams(params)
          this.adminAuthorParams = params
          this.getAllAuthorsForAdmin()
        }
      }
    })
  }

  openUpdateAuthorDialog(author: Author) {
    const dialog = this.dialog.open(EditAuthorFormComponent, {
      minWidth: '500px',
      data: {
        title: 'Chỉnh sửa tên tác giả',
        author
      }
    })
    dialog.afterClosed().subscribe({
      next: async result => {
        if (result) {
          if (result && result.success) {
            const params = this.authorService.getAuthorParams()
            params.pageIndex = 1
            this.authorService.setAuthorParams(params)
            this.adminAuthorParams = params
            this.getAllAuthorsForAdmin()
          }
        }
      }
    })
  }

  async openDeleteAuthorDialog(author: Author) {
    const confirmed = await this.dialogService.confirmDialog(
      'XÁC NHẬN XÓA',
      `Bạn chắc chắn muốn xóa tác giả "${author.name}"?`
    )
    if (confirmed) {
      this.authorService.deleteAuthor(author.id).subscribe({
        next: () => {
          this.authorList = this.authorList.filter(a => a.id !== author.id)
        }
      })
    }
  }

}
