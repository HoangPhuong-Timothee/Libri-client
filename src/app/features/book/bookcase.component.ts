import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookParams } from 'src/app/core/models/params.model';
import { Book } from 'src/app/core/models/book.model';
import { Genre } from 'src/app/core/models/genre.model';
import { Pagination } from 'src/app/core/models/pagination.model';
import { Publisher } from 'src/app/core/models/publisher.model';
import { BookService } from 'src/app/core/services/book.service';
import { GenreService } from 'src/app/core/services/genre.service';
import { PublisherService } from 'src/app/core/services/publisher.service';

@Component({
  selector: 'app-bookcase',
  templateUrl: './bookcase.component.html',
  styleUrls: ['./bookcase.component.css']
})
export class BookcaseComponent implements OnInit {

  searchTerm: string
  // @ViewChild('search') searchViewChild?: ElementRef
  books?: Book[]
  genres: Genre[] = []
  publishers: Publisher[] = []
  pagination?: Pagination<Book[]>
  bookParams = new BookParams()
  totalCount = 0
  sortOptions = [
    {
      name: 'Theo bảng chữ cái',
      value: 'title'
    },
    {
      name: 'Giá: Tăng dần',
      value: 'priceAsc'
    },
    {
      name: 'Giá: Giảm dần',
      value: 'priceDesc'
    },
    {
      name: 'Mới nhất',
      value: 'latest'
    },
    {
      name: 'Cũ nhất',
      value: 'oldest'
    }
  ]

  constructor(
    private bookService: BookService, 
    private genreService: GenreService, 
    private publisherService: PublisherService, 
    private router: Router
  ) 
  { this.searchTerm = '' }

  ngOnInit(): void {
    this.getAllBooks()
    this.getAllGenres()
    this.getAllPublishers()
  }

  getAllBooks() {
    this.bookService.getAllBooks(this.bookParams).subscribe({
      next: (response) => {  
        this.books = response.data
        this.bookParams.pageIndex = response.pageIndex
        this.bookParams.pageSize = response.pageSize
        this.totalCount = response.count
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  showBookDetails(id: number) {
    this.router.navigate(['/bookcase', id])
  }

  getAllGenres(){
    this.genreService.getAllGenres().subscribe({
      next: (response) => {  
        this.genres = [{id: 0, name: 'Tất cả'}, ...response];
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  getAllPublishers(){
    this.publisherService.getAllPublishers().subscribe({
      next: (response) => {  
        this.publishers = [{id: 0, name: 'Tất cả'}, ...response];
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  onGenreSelected(genreId: number) {
    this.bookParams.genreId = genreId
    this.bookParams.pageIndex = 1
    this.getAllBooks()
  }

  onPublisherSelected(publisherId: number) {
    this.bookParams.publisherId = publisherId
    this.bookParams.pageIndex = 1
    this.getAllBooks()
  }

  onSortSelected(event: any) {
    this.bookParams.sort = event.target.value
    this.getAllBooks()
  }

  onPageChanged(event: any) {
    if (this.bookParams.pageIndex !== event) {
      this.bookParams.pageIndex = event
      this.getAllBooks()
    }
  }

  onSearch() {
    // this.bookParams.search = this.searchViewChild?.nativeElement.value
    this.bookParams.search = this.searchTerm
    this.bookParams.pageIndex = 1
    this.getAllBooks()
  }

  onReset() {
    // if (this.searchViewChild) this.searchViewChild.nativeElement.value = '';
    if (this.searchTerm) {
      this.searchTerm = ''
    }
    this.bookParams = new BookParams()
    this.getAllBooks()  
  }

}
