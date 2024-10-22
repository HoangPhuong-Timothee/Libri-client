import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PublisherService } from 'src/app/core/services/publisher.service';

@Component({
  selector: 'app-import-publihsers-form',
  templateUrl: './import-publihsers-form.component.html',
  styleUrls: ['./import-publihsers-form.component.css']
})
export class ImportPublihsersFormComponent {

  selectedFile: File | null = null
  uploadedPercent: number = 0
  data = inject(MAT_DIALOG_DATA)

  constructor(
    private publisherService: PublisherService, 
    private uploadFileDialogRef: MatDialogRef<ImportPublihsersFormComponent>,
    private toastr: ToastrService
  ) { }

  onFileSelected(event: any) {
    const file = event.target.files[0]
    if (!file) {
      this.toastr.warning('Vui lòng chọn file để tải lên.')
      return
    }
    this.selectedFile = file
  }

  importPublishersFile() {
    if (!this.selectedFile) {
      this.toastr.warning('Chưa có file nào được tải lên.')
      return
    }
    this.publisherService.importPublishersFromFile(this.selectedFile).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.loaded !== undefined && event.total !== undefined) {
            this.uploadedPercent = Math.round(100 * event.loaded / event.total)
            if (this.uploadedPercent >= 100) {
              this.toastr.success('Tải file lên hoàn tất.')
            }
          } else {
            this.toastr.warning('Không thể xác định file.')
          }
        } else if (event instanceof HttpResponse) {
          this.toastr.success('Thêm nhà xuất bản từ file thành công.')
          this.uploadFileDialogRef.close({ fileUploaded: true })
        }
      },
      error: (error) => {
        console.error('Có lỗi khi tải file lên.', error)
        this.toastr.error('Có lỗi xảy ra khi tải file lên. Vui lòng thử lại!')
      }
    })
  }
  
}
