import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/core/models/book.model';
import { BookService } from 'src/app/core/services/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  books?: Book[]

  constructor(private httpClient: HttpClient, private bookService: BookService) { }

  ngOnInit(): void {
    this.getLatestBooks()
  }

  getLatestBooks() {
    this.bookService.getLatestBook().subscribe({
      next: (books) => this.books = books,
      error: (error) => console.error(error)
    })
  }

}
