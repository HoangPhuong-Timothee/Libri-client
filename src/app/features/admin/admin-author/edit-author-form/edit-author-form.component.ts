import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Author } from 'src/app/core/models/author.model';

@Component({
  selector: 'app-edit-author-form',
  templateUrl: './edit-author-form.component.html',
  styleUrls: ['./edit-author-form.component.css']
})
export class EditAuthorFormComponent implements OnInit {

  updateAuthorForm!: FormGroup
  data = inject(MAT_DIALOG_DATA)

  constructor(
    private fb: FormBuilder, 
    private updateDialogRef: MatDialogRef<EditAuthorFormComponent>, 
  ) { }

  ngOnInit(): void {
    this.updateAuthorForm = this.fb.group({
      id: [this.data.id, { disabled: true }],
      name: ['', [Validators.required]]
    })
    if (this.data.publisher) {
      this.updateAuthorForm.reset(this.data.author)
    }
  }

  updateAuthor(): void {
    if(this.updateAuthorForm.valid) {
      let author: Author = this.updateAuthorForm.value
      if (this.data.author) {
        author.id === this.data.author.id
      }
      this.updateDialogRef.close({ author })
    }
  }

}
