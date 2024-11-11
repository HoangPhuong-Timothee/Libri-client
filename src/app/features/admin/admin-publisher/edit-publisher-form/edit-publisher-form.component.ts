import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Publisher } from 'src/app/core/models/publisher.model';

@Component({
  selector: 'app-edit-publisher-form',
  templateUrl: './edit-publisher-form.component.html',
  styleUrls: ['./edit-publisher-form.component.css']
})
export class EditPublisherFormComponent implements OnInit { 

  updatePublisherForm!: FormGroup //TODO: Đã render form edit nhưng không load các field cho update
  data = inject(MAT_DIALOG_DATA)

  constructor(
    private fb: FormBuilder, 
    private updateDialogRef: MatDialogRef<EditPublisherFormComponent>, 
  ) { }

  ngOnInit(): void {
    this.updatePublisherForm = this.fb.group({
      id: [this.data.id, { disabled: true }],
      name: ['', [Validators.required]]
    })
    if (this.data.publisher) {
      this.updatePublisherForm.reset(this.data.publisher)
    }
  }

  updatePublisher(): void {
    if(this.updatePublisherForm.valid) {
      let publisher: Publisher = this.updatePublisherForm.value
      if (this.data.publisher) {
        publisher.id === this.data.publisher.id
      }
      this.updateDialogRef.close({ publisher })
    }
  }

}
