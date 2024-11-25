import { HttpEventType } from '@angular/common/http';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ErrorDetails } from 'src/app/core/models/error-response.model';
import { PublisherService } from 'src/app/core/services/publisher.service';

@Component({
  selector: 'app-import-publishers-form',
  templateUrl: './import-publishers-form.component.html',
  styleUrls: ['./import-publishers-form.component.css']
})
export class ImportPublishersFormComponent implements OnInit {

  selectedFile: File | null = null
  errorsList: ErrorDetails[] = []
  columns = [
    { field: 'location', header: 'Vị trí' },
    { field: 'message', header: 'Nội dung' }
  ]
  dataSource: any

  constructor(
    private publisherService: PublisherService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private uploadFileDialogRef: MatDialogRef<ImportPublishersFormComponent>,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    if (this.data.errors && this.data.errors) {
      this.errorsList = this.data.errors;
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0]
    if (!file) {
      this.toastr.warning('Vui lòng chọn file để tải lên.')
      return
    }
    this.selectedFile = file
  }

  onSubmit() {
    if (!this.selectedFile) {
      this.toastr.warning('Chưa có file nào được tải lên.')
      return
    }
    this.publisherService.importPublishersFromFile(this.selectedFile).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.Response) {
          if (event.status === 400) {
            this.toastr.error('Có lỗi xảy ra! File không đúng yêu cầu!')
            this.uploadFileDialogRef.close({ errors: event.body })
          } else {
            this.toastr.success("Thêm dữ liệu từ file thành công")
            this.uploadFileDialogRef.close({ fileUploaded: true })
          }
        }
      },
      error: (error) => {
        console.log(error)
        if (error.status === 400 && error.errors) {
          this.toastr.error('Có lỗi xảy ra! File không đúng yêu cầu!')
          this.uploadFileDialogRef.close({ errors: error.errors })
        }
      }
    })
  }

  get IsError(): boolean {
    return this.errorsList.length > 0
  }

}
