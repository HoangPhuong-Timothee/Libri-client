import { HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BookService } from 'src/app/core/services/book.service';

@Component({
  selector: 'app-import-books-form',
  templateUrl: './import-books-form.component.html',
  styleUrls: ['./import-books-form.component.css'],
})
export class ImportBooksFormComponent implements OnInit {

  errorsList: any
  selectedFile: File | null = null
  uploadedPercent: number = 0
  columns = [
    { field: 'location', header: 'Vị trí' },
    { field: 'message', header: 'Nội dung' }
  ]

  constructor(
    private bookService: BookService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private uploadFileDialogRef: MatDialogRef<ImportBooksFormComponent>,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if (this.data && this.data.errors) {
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
    this.bookService.importBooksFromFile(this.selectedFile).subscribe({
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
        if (error.status === 400 && error.errors.length > 0) {
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
