import { HttpEventType } from "@angular/common/http";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { GenreService } from 'src/app/core/services/genre.service';

@Component({
  selector: 'app-import-genres-form',
  templateUrl: './import-genres-form.component.html',
  styleUrls: ['./import-genres-form.component.css']
})
export class ImportGenresFormComponent {

  errorsList: [] = []
  selectedFile: File | null = null
  columns = [
    { field: 'location', header: 'Vị trí' },
    { field: 'message', header: 'Nội dung' }
  ]

  constructor(
    private genreService: GenreService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private uploadFileDialogRef: MatDialogRef<ImportGenresFormComponent>,
    private toastr: ToastrService ) { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]
  }

  onSubmit() {
    if (!this.selectedFile) {
      this.toastr.warning('Chưa có file nào được tải lên')
      return
    }
    this.genreService.importGenresFromFile(this.selectedFile).subscribe({
      next: (event) => {
        console.log("Đây là event: ", event)
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

}
