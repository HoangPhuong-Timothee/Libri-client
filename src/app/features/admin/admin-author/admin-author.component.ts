import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { firstValueFrom } from 'rxjs';
import { Author } from 'src/app/core/models/author.model';
import { AuthorParams } from 'src/app/core/models/params.model';
import { AuthorService } from 'src/app/core/services/author.service';
import { DialogService } from 'src/app/core/services/dialog.service';
import { AddAuthorFormComponent } from './add-author-form/add-author-form.component';
import { EditAuthorFormComponent } from './edit-author-form/edit-author-form.component';
import { ImportAuthorsFormComponent } from './import-authors-form/import-authors-form.component';

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
        this.openDeleteAuthorDialog(row.id, row.name)
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
      next: result => {
        if (result) {
          this.authorService.addNewAuthor(result.author).subscribe({
            next: response => {

            }
          })
        }
      }
    })
  }

  openImportAuthorsDialog(errors?: any) {
    const dialog = this.dialog.open(ImportAuthorsFormComponent, {
      minWidth: '500px',
      maxHeight: '500px',
      autoFocus: true,
      data: {
        title: 'Nhập dữ liệu tác giả',
        errors: errors
      },
      panelClass: 'custom-dialog-container'
    })
    dialog.afterClosed().subscribe({
      next: (result) => {
        if (result && result.fileUploaded) {
          this.adminAuthorParams.pageIndex = 1
          this.getAllAuthorsForAdmin()
        } else if (result && result.errors) {
          this.openImportAuthorsDialog(result.errors)
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
          await firstValueFrom(this.authorService.updateAuthor(result.author))
          const index = this.authorList.findIndex(a => a.id === result.author.id)
          if (index !== -1) {
            this.authorList[index] = result.author
          }
        }
      }
    })
  }

  async openDeleteAuthorDialog(id: number, name: string) {
    const confirmed = await this.dialogService.confirmDialog(
      'XÁC NHẬN XÓA',
      `Bạn chắc chắn muốn xóa tác giả "${name}"?`
    )
    if (confirmed) {
      this.authorService.deleteAuthor(id).subscribe({
        next: () => {
          this.authorList = this.authorList.filter(a => a.id !== id)
        }
      })
    }
  }

}
