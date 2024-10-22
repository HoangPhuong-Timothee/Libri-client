import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BookParams } from 'src/app/core/models/params.model';
import { Book } from 'src/app/core/models/book.model';
import { BookService } from 'src/app/core/services/book.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from 'src/app/core/services/dialog.service';
import { AddBookFormComponent } from './add-book-form/add-book-form.component';
import { firstValueFrom } from 'rxjs';
import { EditBookFormComponent } from './edit-book-form/edit-book-form.component';

@Component({
  selector: 'app-admin-book',
  templateUrl: './admin-book.component.html',
  styleUrls: ['./admin-book.component.css']
})
export class AdminBookComponent implements OnInit {

  searchTerm: string = ''
  bookList: Book[] = []
  adminBookParams = new BookParams()
  totalBooks = 0
  columns = [
    { field: 'id', header: 'ID' },
    { field: ['title', 'imageUrl'], header: 'Sách', haveImage: true },
    { field: 'author', header: 'Tác giả' },
    { field: 'genre', header: 'Thể loại' },
    { field: 'publisher', header: 'NXB' },
    { field: 'quantityInStock', header: 'Số lượng' },
    { field: 'price', header: 'Giá', pipe: 'currency', pipeArgs: 'VND' }
  ]
  actions = [
    {
      label: 'Xem sách',
      icon: 'visibility',
      tooltip: 'Xem thông tin chi tiết sách',
      action: (row: any) => {
        this.router.navigateByUrl(`/bookcase/${row.id}`)
      }
    },
    {
      label: 'Cập nhật',
      icon: 'edit',
      tooltip: 'Chỉnh sửa thông tin sách',
      action: (row: any) => {
        this.openUpdateBookDialog(row)
      }
    },
    {
      label: 'Xóa',
      icon: 'delete',
      tooltip: 'Xóa sách khỏi kho',
      action: (row: any) => {
        this.openDeleteBookDialog(row.id)
      }

    },
    {
      label: 'Cập nhật kho',
      icon: 'add_circle',
      tooltip: 'Cập nhật số lượng sách trong kho',
      action: (row: any) => {
        console.log(row)
      }
    }
  ]

  constructor(
    private bookService: BookService, 
    private router: Router,
    private dialog: MatDialog,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.getAllBooks()
  }

  getAllBooks() {
    this.bookService.getAllBooks(this.adminBookParams).subscribe({
      next: (response) => {
        if (response.data) {
          this.bookList = response.data
          this.totalBooks = response.count
        }
      }
    })
  }

  onPageChange(event: PageEvent) {
    this.adminBookParams.pageIndex = event.pageIndex + 1
    this.adminBookParams.pageSize = event.pageSize
    this.getAllBooks()
  }

  onSearch() {
    this.adminBookParams.search = this.searchTerm
    this.adminBookParams.pageIndex = 1
    this.getAllBooks()
  }

  onReset() {
    if (this.searchTerm) this.searchTerm = ''
    this.adminBookParams = new BookParams()
    this.getAllBooks()
  }

  openAddNewBookDialog() {
    const dialog = this.dialog.open(AddBookFormComponent, {
      minWidth: '500px',
      data: {
        title: 'Thêm sách mới'
      }
    })
    dialog.afterClosed().subscribe({
      next: async result => {
        if (result) {
          const book: any = await firstValueFrom(this.bookService.addNewBook(result.book))
          if (book) {
            this.bookList.push(book)
          }
        }
      }
    })
  }

  openUpdateBookDialog(book: Book) {
    const dialog = this.dialog.open(EditBookFormComponent, {
      minWidth: '500px',
      data: {
        title: 'Chỉnh sửa thông tin sách',
        book
      }
    })
    dialog.afterClosed().subscribe({
      next: async result => {
        if (result) {
          await firstValueFrom(this.bookService.updateBook(result.book))
          const index = this.bookList.findIndex(b => b.id === result.book.id)
          if (index !== -1) {
            this.bookList[index] = result.book
          }
        }
      }
    })
  }

  async openDeleteBookDialog(id: number) {
    const confirmed = await this.dialogService.confirmDialog(
      'Xác nhận xóa sách',
      'Bạn chắc chắn muốn xóa sách ? Vui lòng xác nhận bên dưới!'
    )
    if (confirmed) {
      this.bookService.deleteBook(id).subscribe({
        next: () => {
          this.bookList = this.bookList.filter(b => b.id !== id)
        }
      })
    }
  }

}
