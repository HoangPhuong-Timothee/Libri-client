import { HttpEventType } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AddAuthorRequest } from 'src/app/core/models/author.model';
import { AuthorService } from 'src/app/core/services/author.service';
import { validateAuthorExist } from 'src/app/shared/helpers/validates/validate-exist';

@Component({
  selector: 'app-add-author-form',
  templateUrl: './add-author-form.component.html',
  styleUrls: ['./add-author-form.component.css']
})
export class AddAuthorFormComponent {

  errorsList: any[] = []
  selectedFile: File | null = null
  columns = [
    { field: 'location', header: 'Vị trí' },
    { field: 'message', header: 'Nội dung' }
  ]
  importFileMode: boolean = true

  constructor(
    private fb: FormBuilder,
    private authorService: AuthorService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<AddAuthorFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  addAuthorForm = this.fb.group({
    name: ['', [Validators.required], [validateAuthorExist(this.authorService)]]
  })

  addNewAuthor(): void {
    if(this.addAuthorForm.valid) {
      let addAuthorRequest = this.addAuthorForm.value as AddAuthorRequest
      this.authorService.addNewAuthor(addAuthorRequest).subscribe({
        next: (response) => {
          if (response) {
            this.toastr.success("Thêm tác giả thành công")
            this.dialogRef.close({ success: true })
          }
        },
        error: (error) => {
            console.log("Có lỗi xảy ra: ", error)
            this.toastr.error('Thêm tác giả mới thất bại!')
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
    this.authorService.importAuthorsFromFile(this.selectedFile).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.Response) {
          if (event.status === 400) {
            this.toastr.error('Có lỗi xảy ra! File không đúng yêu cầu!')
            this.dialogRef.close({ errors: event.body })
          } else {
            this.toastr.success("Thêm tác giả thành công")
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
