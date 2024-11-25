import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddPublisherRequest } from 'src/app/core/models/publisher.model';

@Component({
  selector: 'app-add-publisher-form',
  templateUrl: './add-publisher-form.component.html',
  styleUrls: ['./add-publisher-form.component.css']
})
export class AddPublisherFormComponent {

  constructor(
    private fb: FormBuilder,
    private addPublisherDialogRef: MatDialogRef<AddPublisherFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  addPublisherForm = this.fb.group({
    name: ['', [Validators.required]]
  })

  addNewPublisher(): void {
    if(this.addPublisherForm.valid) {
      let addPublisherRequest = this.addPublisherForm.value as AddPublisherRequest
      this.addPublisherDialogRef.close({ addPublisherRequest })
    }
  }

}
