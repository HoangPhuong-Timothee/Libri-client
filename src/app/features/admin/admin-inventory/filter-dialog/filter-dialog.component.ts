import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BookStore } from 'src/app/core/models/book-store.model';
import { Genre } from 'src/app/core/models/genre.model';
import { BookstoreService } from 'src/app/core/services/bookstore.service';
import { GenreService } from 'src/app/core/services/genre.service';

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.css']
})
export class FilterDialogComponent implements OnInit {

  genresList: Genre[] = []
  bookStoresList: BookStore[] = []

  selectedGenreId: number = this.data.selectedGenreId
  selectedBookStoreId: number = this.data.selectedBookStoresId

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public genreService: GenreService,
    private bookStoreService: BookstoreService,
    private filterDialogRef: MatDialogRef<FilterDialogComponent>
  ) { }

  ngOnInit(): void {
      this.loadAllBookStores()
      this.loadAllGenres()
  }

  loadAllGenres() {
    this.genreService.getAllGenres().subscribe({
      next: response => this.genresList = response,
      error: error => console.log(error)
    })
  }

  loadAllBookStores() {
    this.bookStoreService.getAllBookStores().subscribe({
      next: response => this.bookStoresList = response,
      error: error => console.log(error)
    })
  }

  applyFilters() {
    console.log(this.selectedBookStoreId, this.selectedGenreId)
    this.filterDialogRef.close({
      selectedGenreId: this.selectedGenreId,
      selectedBookStoreId: this.selectedBookStoreId
    })
  }

}
