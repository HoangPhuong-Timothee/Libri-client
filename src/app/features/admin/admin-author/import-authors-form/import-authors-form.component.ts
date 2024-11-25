import { HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ErrorDetails } from 'src/app/core/models/error-response.model';
import { AuthorService } from 'src/app/core/services/author.service';

@Component({
  selector: 'app-import-authors-form',
  templateUrl: './import-authors-form.component.html',
  styleUrls: ['./import-authors-form.component.css']
})
export class ImportAuthorsFormComponent implements OnInit {

  selectedFile: File | null = null
  errorsList: ErrorDetails[] = []
  columns = [
    { field: 'location', header: 'Vị trí' },
    { field: 'message', header: 'Nội dung' }
  ]

  constructor(
    private authorService: AuthorService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private uploadFileDialogRef: MatDialogRef<ImportAuthorsFormComponent>,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    if (this.data.errors && this.data.errors) {
      this.errorsList = this.data.errors
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
    this.authorService.importAuthorsFromFile(this.selectedFile).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.Response) {
          if (event.status === 400) {
            this.toastr.error('Có lỗi xảy ra! File không đúng yêu cầu!')
            this.uploadFileDialogRef.close({ errors: event.body })
          } else {
            this.uploadFileDialogRef.close({ fileUploaded: true })
            this.toastr.success("Thêm dữ liệu từ file thành công")
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
