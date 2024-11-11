import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Author } from 'src/app/core/models/author.model';
import { AddBookRequest } from 'src/app/core/models/book.model';
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


  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private addDialogRef: MatDialogRef<AddBookFormComponent>,
    private publisherService: PublisherService,
    private genreService: GenreService,
    private authorService: AuthorService
  ) { }

  ngOnInit(): void {
    this.initializeForm()
    setTimeout(() => {
      this.loadAuthors()
      this.loadGenres()
      this.loadPublishers()
    })
  }

  initializeForm() {
    this.addBookForm = this.fb.group({
      title: ['', [Validators.required]],
      author: new FormControl('', [Validators.required]),
      genre: new FormControl('', [Validators.required]),
      publisher: new FormControl('', [Validators.required]),
      description: ['', [Validators.required]],
      price: [0, [Validators.required, Validators.min(0)]],
      imageUrl: ['', [Validators.required]],
      publishYear: ['', [Validators.required]],
      isAvailable: [true, [Validators.required]]
    })
  }

  addNewBook(): void {
    if (this.addBookForm.valid) {
      let book: AddBookRequest = this.addBookForm.value
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
