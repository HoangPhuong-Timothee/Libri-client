import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/core/models/book.model';
import { BookParams } from 'src/app/core/models/params.model';
import { BookService } from 'src/app/core/services/book.service';
import { DialogService } from 'src/app/core/services/dialog.service';
import { AddBooksFormComponent } from './add-books-form/add-books-form.component';
import { AdminBookDetailsComponent } from './admin-book-details/admin-book-details.component';
import { BookFilterDialogComponent } from './book-filter-dialog/book-filter-dialog.component';

@Component({
  selector: 'app-admin-book',
  templateUrl: './admin-book.component.html',
  styleUrls: ['./admin-book.component.css'],
})
export class AdminBookComponent implements OnInit {

  book?: Book
  searchTerm: string = ''
  bookList: Book[] = []
  bookParams: BookParams
  totalBooks = 0
  columns = [
    { field: 'id', header: 'Mã sách' },
    { field: ['title', 'imageUrl'], header: 'Sách', haveImage: true },
    { field: 'author', header: 'Tác giả' },
    { field: 'genre', header: 'Thể loại' },
    { field: 'publisher', header: 'NXB' },
    { field: 'price', header: 'Giá', pipe: 'currency', pipeArgs: 'VND' },
  ]
  actions = [
    {
      label: 'Xem sách',
      icon: 'visibility',
      tooltip: 'Xem thông tin chi tiết sách',
      action: (row: any) => {
        this.openBookDetailsDialog(row.id)
      },
    },
    {
      label: 'Xóa',
      icon: 'delete',
      tooltip: 'Xóa sách khỏi kho',
      action: (row: any) => {
        this.openDeleteBookDialog(row.id, row.title)
      },
    },
  ]

  constructor(
    private bookService: BookService,
    private dialog: MatDialog,
    private dialogService: DialogService,
    private toastr: ToastrService
  )
  {
    this.bookParams = bookService.getBookParams()
  }

  ngOnInit(): void {
    this.getAllBooks()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  getAllBooks() {
    this.bookService.getAllBooks().subscribe({
      next: response => {
        this.bookList = response.data
        this.totalBooks = response.count
      },
      error: error => {
        console.log(error)
      }
    })
  }

  openAddNewBooksDialog(errors?: any) {
    const dialog = this.dialog.open(AddBooksFormComponent, {
      minWidth: '500px',
      maxHeight: '500px',
      autoFocus: true,
      data: {
        title: 'Nhập dữ liệu sách',
        errors: errors
      },
      panelClass: 'custom-dialog-container'
    })
    dialog.afterClosed().subscribe({
      next: async (result) => {
        if (result && result.fileUploaded) {
          const params = this.bookService.getBookParams()
          params.pageIndex = 1
          this.bookService.setBookParams(params)
          this.bookParams = params
          this.getAllBooks()
        } else if (result && result.errors) {
          this.openAddNewBooksDialog(result.errors)
        }
      }
    })
  }

  openBookDetailsDialog(id: number) {
    this.bookService.getSingleBook(id).subscribe({
      next: (response) => {
        this.book = response
        this.dialog.open(AdminBookDetailsComponent, {
          minWidth: '300px',
          maxWidth: '1000px',
          minHeight: '200px',
          maxHeight: '580px',
          data: {
            title: `Thông tin sách ${this.book.title}`,
            book: this.book
          }
        })
      },
      error: (error) => {
        console.error('Có lỗi xảy ra:', error)
      }
    })
  }
  async openDeleteBookDialog(id: number, title: string) {
    const confirmed = await this.dialogService.confirmDialog(
      'XÁC NHẬN XÓA',
      `Bạn chắc chắn muốn xóa sách "${title}"?`
    )
    if (confirmed) {
      this.bookService.deleteBook(id).subscribe({
        next: () => {
          this.bookList = this.bookList.filter(b => b.id !== id)
          this.toastr.success(`Xóa sách "${title}" thành công`)
        },
        error: error => {
          console.log("Có lỗi xảy ra: ", error.errors, error.message)
        }
      })
    }
  }

  openFilterDialog() {
    let dialog = this.dialog.open(BookFilterDialogComponent, {
      minWidth: '500px',
      data: {
        selectedGenreId: this.bookParams.genreId,
        selectedPublisherId: this.bookParams.publisherId,
        selectedAuthorId: this.bookParams.authorId
      }
    })
    dialog.afterClosed().subscribe({
      next: result => {
        if (result) {
          const params = this.bookService.getBookParams()
          params.genreId = result.selectedGenreId
          params.publisherId = result.selectedPublisherId
          params.authorId = result.selectedAuthorId
          params.pageIndex = 1
          this.bookService.setBookParams(params)
          this.bookParams = params
          this.getAllBooks()
        }
      }
    })
  }

  onPageChange(event: PageEvent) {
    const params = this.bookService.getBookParams()
    params.pageIndex = event.pageIndex + 1
    params.pageSize = event.pageSize
    this.bookService.setBookParams(params)
    this.bookParams = params
    this.getAllBooks()
  }

  onSearch() {
    const params = this.bookService.getBookParams()
    params.search = this.searchTerm
    params.pageIndex = 1
    this.bookService.setBookParams(params)
    this.bookParams = params
    this.getAllBooks()
  }

  onReset() {
    if (this.searchTerm) {
      this.searchTerm = ''
    }
    this.bookParams = new BookParams()
    this.bookService.setBookParams(this.bookParams)
    this.getAllBooks()
  }

}
