import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { InventoryService } from 'src/app/core/services/inventory.service';

@Component({
  selector: 'app-import-inventories-form',
  templateUrl: './import-inventories-form.component.html',
  styleUrls: ['./import-inventories-form.component.css']
})
export class ImportInventoriesFormComponent {

  selectedFile: File | null = null
  uploadedPercent: number = 0
  errorsList: Array<{ location: string; message: string }> = []
  columns = [
    { field: 'location', header: 'Vị trí' },
    { field: 'message', header: 'Nội dung' }
  ]
  dataSource: any

  constructor(
    private invnetoryService: InventoryService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private uploadFileDialogRef: MatDialogRef<ImportInventoriesFormComponent>,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef
  ) { }

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
    this.importInventoriesFile()
  }

  importInventoriesFile() {
    if (!this.selectedFile) {
      this.toastr.warning('Chưa có file nào được tải lên.');
      return;
    }
    this.invnetoryService.importBookInventories(this.selectedFile).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.loaded !== undefined && event.total !== undefined) {
            this.uploadedPercent = Math.round(100 * event.loaded / event.total);
            if (this.uploadedPercent >= 100) {
              this.uploadFileDialogRef.close({ fileUploaded: true });
            }
          } else {
            this.toastr.warning('Không thể xác định file.');
          }
        } else if (event instanceof HttpResponse) {
          this.toastr.success('Thêm thông tin kho từ file thành công.');
          this.uploadFileDialogRef.close({ fileUploaded: true });
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
