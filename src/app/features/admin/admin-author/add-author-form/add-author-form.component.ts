import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddAuthorRequest } from 'src/app/core/models/author.model';

@Component({
  selector: 'app-add-author-form',
  templateUrl: './add-author-form.component.html',
  styleUrls: ['./add-author-form.component.css']
})
export class AddAuthorFormComponent {

  constructor(
    private fb: FormBuilder,
    private addDialogRef: MatDialogRef<AddAuthorFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  addAuthorForm = this.fb.group({
    name: ['', [Validators.required]]
  })

  addNewAuthor(): void {
    if(this.addAuthorForm.valid) {
      let addAuthorRequest = this.addAuthorForm.value as AddAuthorRequest
      this.addDialogRef.close({ addAuthorRequest })
    }
  }

}
