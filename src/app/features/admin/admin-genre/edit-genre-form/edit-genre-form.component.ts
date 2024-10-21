import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Genre } from 'src/app/core/models/genre.model';

@Component({
  selector: 'app-edit-genre-form',
  templateUrl: './edit-genre-form.component.html',
  styleUrls: ['./edit-genre-form.component.css']
})
export class EditGenreFormComponent implements OnInit {

  updateGenreForm!: FormGroup
  data = inject(MAT_DIALOG_DATA)

  constructor(
    private fb: FormBuilder, 
    private updateDialogRef: MatDialogRef<EditGenreFormComponent>, 
  ) { }

  ngOnInit(): void {
    this.updateGenreForm = this.fb.group({
      id: [this.data.id, { disabled: true }],
      name: ['', [Validators.required]]
    })
    if (this.data.genre) {
      this.updateGenreForm.reset(this.data.genre)
    }
  }

  updateGenre(): void {
    if(this.updateGenreForm.valid) {
      let genre: Genre = this.updateGenreForm.value
      if (this.data.genre) {
        genre.id === this.data.genre.id
      }
      this.updateDialogRef.close({ genre })
    }
  }

}
