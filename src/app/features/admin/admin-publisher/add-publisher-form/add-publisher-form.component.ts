import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddPublisherRequest } from 'src/app/core/models/publisher.model';

@Component({
  selector: 'app-add-publisher-form',
  templateUrl: './add-publisher-form.component.html',
  styleUrls: ['./add-publisher-form.component.css']
})
export class AddPublisherFormComponent implements OnInit {

  addPublisherForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private addPublisherDialogRef: MatDialogRef<AddPublisherFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.initializeForm()
  }

  initializeForm() {
    this.addPublisherForm = this.fb.group({
      name: ['', [Validators.required]]
    })
  }

  addNewPublisher(): void {
    if(this.addPublisherForm.valid) {
      let addPublisher: AddPublisherRequest = this.addPublisherForm.value
      this.addPublisherDialogRef.close({ addPublisher })
    }
  }

}
