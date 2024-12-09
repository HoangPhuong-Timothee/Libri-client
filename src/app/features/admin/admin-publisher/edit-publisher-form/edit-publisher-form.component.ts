import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UpdatePublisherRequest } from 'src/app/core/models/publisher.model';
import { PublisherService } from 'src/app/core/services/publisher.service';

@Component({
  selector: 'app-edit-publisher-form',
  templateUrl: './edit-publisher-form.component.html',
  styleUrls: ['./edit-publisher-form.component.css']
})
export class EditPublisherFormComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private publisherService: PublisherService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<EditPublisherFormComponent>,
  ) { }

  ngOnInit(): void {
    if (this.data.publisher) {
      this.updatePublisherForm.reset(this.data.publisher)
    }
  }

  updatePublisherForm = this.fb.group({
    id: [this.data.id],
    name: ['', [Validators.required]]
  })

  updatePublisher(): void {
    if(this.updatePublisherForm.valid) {
      let updatePublisherRequest = this.updatePublisherForm.value as UpdatePublisherRequest
      this.publisherService.updatePublisher(updatePublisherRequest).subscribe({
        next: (response) => {
          if (response) {
            this.toastr.success("Cập nhật nhà xuất bản thành công")
            this.dialogRef.close({ success: true })
          }
        },
        error: (error) => {
            console.log("Có lỗi xảy ra: ", error)
            this.toastr.error('Cập nhật nhà xuất bản thất bại!')
          }
      })
    }
  }

}
