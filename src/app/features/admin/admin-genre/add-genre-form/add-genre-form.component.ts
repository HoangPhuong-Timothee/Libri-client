import { HttpEventType } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AddGenreRequest } from 'src/app/core/models/genre.model';
import { GenreService } from 'src/app/core/services/genre.service';
import { validateGenreExist } from 'src/app/shared/helpers/validates/validate-exist';

@Component({
  selector: 'app-add-genre-form',
  templateUrl: './add-genre-form.component.html',
  styleUrls: ['./add-genre-form.component.css']
})
export class AddGenreFormComponent {

  errorsList: any[] = []
  selectedFile: File | null = null
  columns = [
    { field: 'location', header: 'Vị trí' },
    { field: 'message', header: 'Nội dung' }
  ]
  importFileMode: boolean = true

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private genreService: GenreService,
    private dialogRef: MatDialogRef<AddGenreFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  addGenreForm = this.fb.group({
    name: ['', [Validators.required], [validateGenreExist(this.genreService)]]
  })

  addNewGenre(): void {
    if(this.addGenreForm.valid) {
      let addGenreRequest = this.addGenreForm.value as AddGenreRequest
      this.genreService.addNewGenre(addGenreRequest).subscribe({
        next: (response) => {
          if (response) {
            this.toastr.success("Thêm thể loại sách thành công")
            this.dialogRef.close({ success: true })
          }
        },
        error: (error) => {
            console.log("Có lỗi xảy ra: ", error)
            this.toastr.error('Thêm thể loại mới thất bại!')
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
    this.genreService.importGenresFromFile(this.selectedFile).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.Response) {
          if (event.status === 400) {
            this.toastr.error('Có lỗi xảy ra! File không đúng yêu cầu!')
            this.dialogRef.close({ errors: event.body })
          } else {
            this.toastr.success("Thêm thể loại sách thành công")
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
