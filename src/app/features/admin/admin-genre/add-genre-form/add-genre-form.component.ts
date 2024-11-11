import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Genre } from 'src/app/core/models/genre.model';

@Component({
  selector: 'app-add-genre-form',
  templateUrl: './add-genre-form.component.html',
  styleUrls: ['./add-genre-form.component.css']
})
export class AddGenreFormComponent implements OnInit {

  addGenreForm!: FormGroup

  constructor(
    private fb: FormBuilder, 
    private addDialogRef: MatDialogRef<AddGenreFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.addGenreForm = this.fb.group({
      name: ['', [Validators.required]]
    })
  }

  addNewGenre(): void {
    if(this.addGenreForm.valid) {
      let genre: Genre = this.addGenreForm.value
      this.addDialogRef.close({ genre })
    }
  }

}
