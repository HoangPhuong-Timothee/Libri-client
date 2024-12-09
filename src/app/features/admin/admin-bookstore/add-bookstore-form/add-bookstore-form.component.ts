import { HttpEventType } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AddBookStoreRequest } from 'src/app/core/models/book-store.model';
import { BookstoreService } from 'src/app/core/services/bookstore.service';
import { validateBookStoreExist } from 'src/app/shared/helpers/validates/validate-exist';

@Component({
  selector: 'app-add-bookstore-form',
  templateUrl: './add-bookstore-form.component.html',
  styleUrls: ['./add-bookstore-form.component.css']
})
export class AddBookstoreFormComponent {

  errorsList: any[] = []
  selectedFile: File | null = null
  columns = [
    { field: 'location', header: 'Vị trí' },
    { field: 'details', header: 'Nội dung' }
  ]
  importFileMode: boolean = true

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private bookStoreService: BookstoreService,
    private dialogRef: MatDialogRef<AddBookstoreFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  addBookStoreForm = this.fb.group({
    storeName: ['', [Validators.required], [validateBookStoreExist(this.bookStoreService)]],
    storeAddress: ['', [Validators.required]]
  })

  addNewBookStore() {
    if(this.addBookStoreForm.valid) {
      let addBookStoreRequest = this.addBookStoreForm.value as AddBookStoreRequest
      this.bookStoreService.addNewBookStore(addBookStoreRequest).subscribe({
        next: (response) => {
          if (response) {
            this.toastr.success("Thêm hiệu sách thành công")
            this.dialogRef.close({ success: true })
          }
        },
        error: (error) => {
            console.log("Có lỗi xảy ra: ", error)
            this.toastr.error('Thêm hiệu sách mới thất bại!')
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
    this.bookStoreService.importBookStoresFromFile(this.selectedFile).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.Response) {
          if (event.status === 400) {
            this.toastr.error('Có lỗi xảy ra! File không đúng yêu cầu!')
            this.dialogRef.close({ errors: event.body })
          } else {
            this.toastr.success("Thêm hiệu sách thành công")
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
