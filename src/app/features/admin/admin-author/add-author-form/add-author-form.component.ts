import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Author } from 'src/app/core/models/author.model';

@Component({
  selector: 'app-add-author-form',
  templateUrl: './add-author-form.component.html',
  styleUrls: ['./add-author-form.component.css']
})
export class AddAuthorFormComponent implements OnInit {

  addAuthorForm!: FormGroup
  data = inject(MAT_DIALOG_DATA)

  constructor(
    private fb: FormBuilder, 
    private addDialogRef: MatDialogRef<AddAuthorFormComponent>, 
  ) { }

  ngOnInit(): void {
    this.addAuthorForm = this.fb.group({
      name: ['', [Validators.required]]
    })
  }

  addNewAuthor(): void {
    if(this.addAuthorForm.valid) {
      let author: Author = this.addAuthorForm.value
      this.addDialogRef.close({ author })
    }
  }

}
