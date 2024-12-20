import { HttpEventType } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AddPublisherRequest } from 'src/app/core/models/publisher.model';
import { PublisherService } from 'src/app/core/services/publisher.service';
import { validatePublisherExist } from 'src/app/shared/helpers/validates/validate-exist';

@Component({
  selector: 'app-add-publisher-form',
  templateUrl: './add-publisher-form.component.html',
  styleUrls: ['./add-publisher-form.component.css']
})
export class AddPublisherFormComponent {

  errorsList: any[] = []
  selectedFile: File | null = null
  columns = [
    { field: 'location', header: 'Vị trí' },
    { field: 'message', header: 'Nội dung' }
  ]
  importFileMode: boolean = true

  constructor(
    private fb: FormBuilder,
    private publisherService: PublisherService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<AddPublisherFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  addPublisherForm = this.fb.group({
    name: ['', [Validators.required], [validatePublisherExist(this.publisherService)]]
  })

  addNewPublisher(): void {
    if(this.addPublisherForm.valid) {
      let addPublisherRequest = this.addPublisherForm.value as AddPublisherRequest
      this.publisherService.addNewPublisher(addPublisherRequest).subscribe({
        next: (response) => {
          if (response) {
            this.toastr.success("Thêm nhà xuất bản thành công")
            this.dialogRef.close({ success: true })
          }
        },
        error: (error) => {
            console.log("Có lỗi xảy ra: ", error)
            this.toastr.error('Thêm nhà xuất bản thất bại!')
          }
      })
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]
  }

  submitFile() {
    if (!this.selectedFile) {
      this.toastr.warning('Chưa có file nào được tải lên')
      return
    }
    this.publisherService.importPublishersFromFile(this.selectedFile).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.Response) {
          if (event.status === 400) {
            this.toastr.error('Có lỗi xảy ra! File không đúng yêu cầu!')
            this.dialogRef.close({ errors: event.body })
          } else {
            this.toastr.success("Thêm nhà xuất bản thành công")
            this.dialogRef.close({ success: true })
          }
        }
      },
      error: (error) => {
        if (error.status === 400 && error.errors) {
          this.toastr.error('Có lỗi xảy ra! File không đúng yêu cầu!')
          this.errorsList = error.errors
        } else {
          this.toastr.error('Lỗi không xác định! Vui lòng thử lại.')
          this.dialogRef.close()
        }
      }
    })
  }

  changeMode() {
    this.importFileMode =!this.importFileMode
  }

}
