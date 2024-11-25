import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BookStore } from 'src/app/core/models/book-store.model';
import { ErrorDetails } from 'src/app/core/models/error-response.model';
import { BookstoreService } from 'src/app/core/services/bookstore.service';
import { InventoryService } from 'src/app/core/services/inventory.service';
import { ImportInventoriesFormComponent } from '../import-inventories-form/import-inventories-form.component';

@Component({
  selector: 'app-export-inventory-form',
  templateUrl: './export-inventory-form.component.html',
  styleUrls: ['./export-inventory-form.component.css']
})
export class ExportInventoryFormComponent {

  bookStoresList: BookStore[] = []
  isImportMode = false
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>
  errorsList: ErrorDetails[] = []
  selectedFile: File | null = null
  columns = [
    { field: 'location', header: 'Vị trí' },
    { field: 'message', header: 'Nội dung' }
  ]
  displayedColumns: string[] = ['bookTitle', 'quantity', 'storeName', 'dateImported']
  dataSource = [
    { bookTitle: '', quantity: 0, storeName: '', dateImported: '' }
  ]

  constructor(
    private inventoryService: InventoryService,
    private bookStoreService: BookstoreService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private uploadFileDialogRef: MatDialogRef<ImportInventoriesFormComponent>,
    private toastr: ToastrService ) { }

  ngOnInit(): void {
    if (this.data && this.data.errors) {
      this.errorsList = this.data.errors
    }

    this.loadAllBookStore()
  }

  loadAllBookStore() {
    this.bookStoreService.getAllBookStores().subscribe({
      next: response => this.bookStoresList = response,
      error: error => console.log("Có lỗi: ", error)
    })
  }

  save() {

  }

  switchToImportMode(): void {
    this.isImportMode = true
  }

  switchToTableMode(): void {
    this.isImportMode = false
  }

  onFileSelected(event: any) {
    const file = event.target.files[0]
    if (!file) {
      this.toastr.warning('Vui lòng chọn file để tải lên.')
      return
    }
    this.selectedFile = file
  }


  // onSubmit() {
  //   if (!this.selectedFile) {
  //     this.toastr.warning('Chưa có file nào được tải lên')
  //     return
  //   }
  //   this.inventoryService.importBookInventoriesFromFile(this.selectedFile).subscribe({
  //     next: (event) => {
  //       if (event.type === HttpEventType.Response) {
  //         if (event.status === 400) {
  //           this.toastr.error('Có lỗi xảy ra! File không đúng yêu cầu!')
  //           console.log(event.body)
  //           this.uploadFileDialogRef.close({ errors: event.body })
  //         } else {
  //           this.toastr.success("Thêm dữ liệu từ file thành công")
  //           this.uploadFileDialogRef.close({ fileUploaded: true })
  //         }
  //       }
  //     },
  //     error: (error) => {
  //       console.log(error)
  //       if (error.status === 400 && error.errors) {
  //         this.toastr.error('Có lỗi xảy ra! File không đúng yêu cầu!')
  //         this.uploadFileDialogRef.close({ errors: error.errors })
  //       }
  //     }
  //   })
  // }

  // get IsError(): boolean {
  //   return this.errorsList.length > 0
  // }

}
