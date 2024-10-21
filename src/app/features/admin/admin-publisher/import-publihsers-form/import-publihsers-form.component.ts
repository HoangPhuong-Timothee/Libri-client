// import { Component, inject } from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { PublisherService } from 'src/app/core/services/publisher.service';
// import { ToastrService } from 'ngx-toastr';
// import { HttpEventType, HttpResponse } from '@angular/common/http';

// @Component({
//   selector: 'app-import-publihsers-form',
//   templateUrl: './import-publihsers-form.component.html',
//   styleUrls: ['./import-publihsers-form.component.css']
// })
// export class ImportPublihsersFormComponent {

//   uploadedPercent: number = 0
//   data = inject(MAT_DIALOG_DATA)

//   constructor(
//     private publisherService: PublisherService, 
//     private uploadFileDialogRef: MatDialogRef<ImportPublihsersFormComponent>,
//     private toastr: ToastrService
//   ) { }

//   importPublisherFromFile(publisherFile: File) {
//     if (!publisherFile || publisherFile.size === 0) {
//       this.toastr.warning("Không tìm thấy dữ liệu trong file")
//       return
//     }
//     this.publisherService.importPublishersFromFile(publisherFile).subscribe({
//       next: (result) => {
        
//       } 
//     })
//   }

//   onFileSelected(event: any) {
//     const file = event.target.files[0]
//     if (!file) {
//       this.toastr.warning('Vui lòng chọn file để tải lên.')
//       return
//     }
//     this.publisherService.importPublishersFromFile(file).subscribe({
//       next: (event) => {
//         if (event.type === HttpEventType.UploadProgress) {
//           if (event.loaded !== undefined && event.total !== undefined) {
//             this.uploadedPercent = Math.round(100 * event.loaded / event.total)
//             if (this.uploadedPercent >= 100) {
//               this.toastr.success("Tải lên hoàn tất.")
//             }
//           } else {
//             this.toastr.warning("Không thể xác định file")
//           }
//         } else if (event instanceof HttpResponse) {
//           this.toastr.success("Tải file lên thành công.")
//         }
//       },
//       error: (error) => {
//         console.error("Lỗi upload file:", error)
//         this.toastr.error("Có lỗi xảy ra khi upload file. Vui lòng thử lại!")
//       }
//     })
//   }
  
// }
