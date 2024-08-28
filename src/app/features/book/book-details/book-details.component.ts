import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/core/models/book.model';
import { BookService } from 'src/app/core/services/book.service';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  book?: Book

  constructor(private bookService: BookService, private route: ActivatedRoute, private bcService: BreadcrumbService) {
    this.bcService.set('@bookDetails', ' ')
   }

  ngOnInit(): void {
    this.showBookDetails();
  }

  showBookDetails() {
    const id = this.route.snapshot.paramMap.get('id');
    if(id) this.bookService.getSingleBook(+id).subscribe({
      next: (reponse) => {
        this.book = reponse
        this.bcService.set('@bookDetails', this.book.title)
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

}
