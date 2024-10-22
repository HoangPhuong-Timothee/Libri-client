import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Author } from 'src/app/core/models/author.model';
import { Book } from 'src/app/core/models/book.model';
import { Genre } from 'src/app/core/models/genre.model';
import { Publisher } from 'src/app/core/models/publisher.model';
import { AuthorService } from 'src/app/core/services/author.service';
import { GenreService } from 'src/app/core/services/genre.service';
import { PublisherService } from 'src/app/core/services/publisher.service';

@Component({
  selector: 'app-add-book-form',
  templateUrl: './add-book-form.component.html',
  styleUrls: ['./add-book-form.component.css']
})
export class AddBookFormComponent implements OnInit {

  addBookForm!: FormGroup
  genreOptions: Genre[] = []
  authorOptions: Author[] = []
  publisherOptions: Publisher[] = []
  data = inject(MAT_DIALOG_DATA)

  constructor(
    private fb: FormBuilder, 
    private addDialogRef: MatDialogRef<AddBookFormComponent>,
    public publisherService: PublisherService,
    public genreService: GenreService,
    public authorService: AuthorService
  ) { }

  ngOnInit(): void {
    this.addBookForm = this.fb.group({
      title: ['', [Validators.required]],
      authorId: ['', [Validators.required]],
      genreId: ['', [Validators.required]],
      publisherId: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: [0, [Validators.required, Validators.min(0)]],
      imageUrl: ['', [Validators.required]],
      publishYear: [2024, [Validators.required]],
      isAvailable: [true, [Validators.required]],
      quantityInStock: [0, [Validators.required, Validators.min(0)]]
    })
    setTimeout(() => {
      this.loadAuthors()
      this.loadGenres()
      this.loadPublishers()
    })
  }

  addNewBook(): void {
    if (this.addBookForm.valid) {
      let book: Book = this.addBookForm.value
      this.addDialogRef.close({ book })
    }
  }

  loadGenres() {
    if (this.genreOptions.length > 0) return
    this.genreService.getAllGenres().subscribe({
      next: response => this.genreOptions = response
    })
  }

  loadAuthors() {
    if (this.authorOptions.length > 0) return
    this.authorService.getAllAuthors().subscribe({
      next: response => this.authorOptions = response
    })
  }

  loadPublishers() {
    if (this.publisherOptions.length > 0) return
    this.publisherService.getAllPublishers().subscribe({
      next: response => this.publisherOptions = response
    })
  }

}
