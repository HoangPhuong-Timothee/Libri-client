import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddGenreRequest } from 'src/app/core/models/genre.model';

@Component({
  selector: 'app-add-genre-form',
  templateUrl: './add-genre-form.component.html',
  styleUrls: ['./add-genre-form.component.css']
})
export class AddGenreFormComponent {

  constructor(
    private fb: FormBuilder,
    private addDialogRef: MatDialogRef<AddGenreFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  addGenreForm = this.fb.group({
    name: ['', [Validators.required]]
  })

  addNewGenre(): void {
    if(this.addGenreForm.valid) {
      let addGenreRequest = this.addGenreForm.value as AddGenreRequest
      this.addDialogRef.close({ addGenreRequest })
    }
  }

}
