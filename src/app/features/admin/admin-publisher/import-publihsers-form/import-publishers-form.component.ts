import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PublisherService } from 'src/app/core/services/publisher.service';

@Component({
  selector: 'app-import-publishers-form',
  templateUrl: './import-publishers-form.component.html',
  styleUrls: ['./import-publishers-form.component.css']
})
export class ImportPublishersFormComponent implements OnInit {

  selectedFile: File | null = null
  uploadedPercent: number = 0
  errorsList: Array<{ location: string; message: string }> = []
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
    this.importPublishersFile()
  }

  importPublishersFile() {
    if (!this.selectedFile) {
      this.toastr.warning('Chưa có file nào được tải lên.');
      return;
    }
    this.publisherService.importPublishersFromFile(this.selectedFile).subscribe({
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
          this.cd.detectChanges();
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
