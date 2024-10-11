import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BookParams } from 'src/app/core/models/params.model';
import { Book } from 'src/app/core/models/book.model';
import { BookService } from 'src/app/core/services/book.service';
import { MatDialog } from '@angular/material/dialog';
// import { AddBookComponent } from './add-book/add-book.component';
import { Router } from '@angular/router';

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
        console.log(row)
      }
    },
    {
      label: 'Xóa',
      icon: 'delete',
      tooltip: 'Xóa sách khỏi kho',
      action: (row: any) => {
        console.log(row)
      }

    },
    {
      label: 'Cập nhật số lượng',
      icon: 'add_circle',
      tooltip: 'Cập nhật số lượng sách trong kho',
      action: (row: any) => {
        console.log(row)
      }
    }
  ]

  constructor(private bookService: BookService, private router: Router) { }

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

}
