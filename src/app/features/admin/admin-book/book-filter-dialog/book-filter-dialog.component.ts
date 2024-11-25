import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Genre } from 'src/app/core/models/genre.model';
import { Publisher } from 'src/app/core/models/publisher.model';
import { GenreService } from 'src/app/core/services/genre.service';
import { PublisherService } from 'src/app/core/services/publisher.service';

@Component({
  selector: 'app-bookfilter-dialog',
  templateUrl: './book-filter-dialog.component.html',
  styleUrls: ['./book-filter-dialog.component.css']
})
export class BookFilterDialogComponent implements OnInit {

  genresList: Genre[] = []
  publisherList: Publisher[] = []

  selectedGenreId: number = this.data.selectedGenreId
  selectedPublisherId: number = this.data.selectedPublishersId

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public genreService: GenreService,
    private publisherService: PublisherService,
    private filterDialogRef: MatDialogRef<BookFilterDialogComponent>
  ) { }

  ngOnInit(): void {
      this.loadAllPublishers()
      this.loadAllGenres()
  }

  loadAllGenres() {
    this.genreService.getAllGenres().subscribe({
      next: response => {
        this.genresList = response
      }
    })
  }

  loadAllPublishers() {
    this.publisherService.getAllPublishers().subscribe({
      next: response => {
        this.publisherList = response
      }
    })
  }

  applyFilters() {
    this.filterDialogRef.close({
      selectedGenreId: this.selectedGenreId,
      selectedPublisherId: this.selectedPublisherId
    })
  }

}
