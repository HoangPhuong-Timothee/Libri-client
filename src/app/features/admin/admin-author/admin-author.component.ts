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
  adminAuthorParams = new AuthorParams()
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
        this.openDeleteAuthorDialog(row.id)
      }

    }
  ]

  constructor(
    private authorService: AuthorService,
    private dialog: MatDialog,
    private dialogService: DialogService
  ) { }

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

  openAddNewAuthorDialog() {
    const dialog = this.dialog.open(AddAuthorFormComponent, {
      minWidth: '500px',
      data: {
        title: 'Thêm tác giả'
      }
    })
    dialog.afterClosed().subscribe({
      next: async result => {
        if (result) {
          const author: any = await firstValueFrom(this.authorService.addNewAuthor(result.author))
          if (author) {
            this.authorList.push(author)
          }
        }
      }
    })
  }

  openImportAuthorsDialog(errors?: Array<{ location: string; message: string }>) {
    const dialog = this.dialog.open(ImportAuthorsFormComponent, {
      minWidth: '500px',
      autoFocus: false,
      data: {
        title: 'Nhập dữ liệu tác giả',
        errors: errors || []
      },
      panelClass: 'dynamic-dialog'
    });
    dialog.afterClosed().subscribe({
      next: async (result) => {
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

  async openDeleteAuthorDialog(id: number) {
    const confirmed = await this.dialogService.confirmDialog(
      'Xác nhận xóa tác giả',
      'Bạn chắc chắn muốn xóa tác giả ? Vui lòng xác nhận bên dưới!'
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
