import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Book } from 'src/app/core/models/book.model';

@Component({
  selector: 'app-edit-book-form',
  templateUrl: './edit-book-form.component.html',
  styleUrls: ['./edit-book-form.component.css']
})
export class EditBookFormComponent implements OnInit {

  updateBookForm!: FormGroup
  data = inject(MAT_DIALOG_DATA)

  constructor(private fb: FormBuilder, private updateDialogRef: MatDialogRef<EditBookFormComponent>) { }

  ngOnInit(): void {
    this.updateBookForm = this.fb.group({
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
    if (this.data.book) {
      this.updateBookForm.reset(this.data.book)
    }
  }

  updateBook(): void {
    if(this.updateBookForm.valid) {
      let book: Book = this.updateBookForm.value
      if (this.data.book) {
        book.id === this.data.book.id
      }
      this.updateDialogRef.close({ book })
    }
  }

}
