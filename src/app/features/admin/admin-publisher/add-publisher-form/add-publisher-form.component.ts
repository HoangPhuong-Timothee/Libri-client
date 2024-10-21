import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Publisher } from 'src/app/core/models/publisher.model';

@Component({
  selector: 'app-add-publisher-form',
  templateUrl: './add-publisher-form.component.html',
  styleUrls: ['./add-publisher-form.component.css']
})
export class AddPublisherFormComponent implements OnInit {

  addPublisherForm!: FormGroup
  data = inject(MAT_DIALOG_DATA)

  constructor(
    private fb: FormBuilder, 
    private addDialogRef: MatDialogRef<AddPublisherFormComponent>, 
  ) { }

  ngOnInit(): void {
    this.addPublisherForm = this.fb.group({
      name: ['', [Validators.required]]
    })
  }

  addNewPublisher(): void {
    if(this.addPublisherForm.valid) {
      let publisher: Publisher = this.addPublisherForm.value
      this.addDialogRef.close({ publisher })
    }
  }

}
