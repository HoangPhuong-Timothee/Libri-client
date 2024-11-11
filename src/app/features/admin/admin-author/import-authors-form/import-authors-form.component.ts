import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthorService } from 'src/app/core/services/author.service';

@Component({
  selector: 'app-import-authors-form',
  templateUrl: './import-authors-form.component.html',
  styleUrls: ['./import-authors-form.component.css']
})
export class ImportAuthorsFormComponent implements OnInit {

  selectedFile: File | null = null
  uploadedPercent: number = 0
  errorsList: Array<{ location: string; message: string }> = []
  columns = [
    { field: 'location', header: 'Vị trí' },
    { field: 'message', header: 'Nội dung' }
  ]
  dataSource: any

  constructor(
    private authorService: AuthorService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private uploadFileDialogRef: MatDialogRef<ImportAuthorsFormComponent>,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    if (this.data.errors && this.data.errors.length > 0) {
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
    this.importAuthorsFile()
  }

  importAuthorsFile() {
    if (!this.selectedFile) {
      this.toastr.warning('Chưa có file nào được tải lên.')
      return
    }
    this.authorService.importAuthorsFromFile(this.selectedFile).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.loaded !== undefined && event.total !== undefined) {
            this.uploadedPercent = Math.round(100 * event.loaded / event.total)
            if (this.uploadedPercent >= 100) {
              this.uploadFileDialogRef.close({ fileUploaded: true })
            }
          } else {
            this.toastr.warning('Không thể xác định file.')
          }
        } else if (event instanceof HttpResponse) {
          this.toastr.success('Thêm thể loại từ file thành công.')
          this.uploadFileDialogRef.close({ fileUploaded: true })
        }
      },
      error: (error) => {
        // console.error('Có lỗi khi tải file lên.', error)
        if (error.status === 400 && error.errors) {
          this.toastr.error('Có lỗi xảy ra! File không đúng yêu cầu!')
          this.cd.detectChanges()
          this.uploadFileDialogRef.close({ errors: error.errors })
        } else {
          this.toastr.error('Có lỗi xảy ra khi tải file lên. Vui lòng thử lại!')
        }
      }
    })
  }

  isErrorData(): boolean {
    return this.errorsList.length > 0
  }

}
