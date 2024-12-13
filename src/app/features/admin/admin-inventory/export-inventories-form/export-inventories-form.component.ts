import { HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { BookStore } from 'src/app/core/models/book-store.model';
import { ExportInventoriesRequest } from 'src/app/core/models/inventory.model';
import { BookService } from 'src/app/core/services/book.service';
import { BookstoreService } from 'src/app/core/services/bookstore.service';
import { InventoryService } from 'src/app/core/services/inventory.service';
import { validateBookExist, validateBookInStore } from 'src/app/shared/helpers/validates/validate-exist';
import { validatePastDate, validateQuantityInStore } from 'src/app/shared/helpers/validates/validate-inventory-inputs';

@Component({
  selector: 'app-export-inventories-form',
  templateUrl: './export-inventories-form.component.html',
  styleUrls: ['./export-inventories-form.component.css']
})
export class ExportInventoriesFormComponent implements OnInit {

  exportForm!: FormGroup
  errorsList: any[] = []
  selectedFile: File | null = null
  columns = [
    { field: 'location', header: 'Vị trí' },
    { field: 'details', header: 'Nội dung' }
  ]
  headerColumns: string[] = ['Tên sách', 'Hiệu sách', 'Số lượng', 'Ngày xuất kho', 'Ghi chú', '']
  bookStoresList: BookStore[] = []
  availableQuantity$ = new BehaviorSubject<number>(0)
  importFileMode: boolean = true

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private bookStoreService: BookstoreService,
    private bookService: BookService,
    private inventoryService: InventoryService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<ExportInventoriesFormComponent>
  ) { }

  ngOnInit(): void {
    this.loadAllBookStores()
    this.initializeForm()
  }

  initializeForm() {
    this.exportForm = this.fb.group({
      rows: this.fb.array([], [Validators.required])
    })
    this.addRow()
  }

  loadAllBookStores() {
    this.bookStoreService.getAllBookStores().subscribe({
      next: response => this.bookStoresList = response,
      error: error => console.log("Có lỗi xảy ra: ", error)
    })
  }

  changeMode() {
    this.importFileMode = !this.importFileMode
  }

  createFormGroup(): FormGroup {
    return this.fb.group({
      bookTitle: ['', [Validators.required], [validateBookExist(this.bookService)]],
      quantity: [0, [Validators.required, Validators.min(0)], [validateQuantityInStore(this.inventoryService, this.availableQuantity$)]],
      bookStoreId: ['', [Validators.required], [validateBookInStore(this.bookService)]],
      exportDate: ['', [Validators.required, validatePastDate()]],
      exportNotes: ['', [Validators.required, Validators.maxLength(100)]]
    })
  }

  addRow() {
    this.rows.push(this.createFormGroup())
  }

  get rows(): FormArray {
    return this.exportForm.get('rows') as FormArray
  }

  removeFormGroup(index: number) {
    this.rows.removeAt(index)
  }

  submitForm() {
    if (this.exportForm.valid) {
        const requestData: ExportInventoriesRequest[] = this.exportForm.value.rows
        this.inventoryService.exportInventoriesManual(requestData).subscribe({
        next: response => {
          if (response) {
            this.toastr.success("Xuất kho thành công")
            this.dialogRef.close({ exportSuccess: true })
          }
        },
        error: error => {
          console.log("Có lỗi: ", error)
          this.toastr.error("Có lỗi xảy ra trong quá trình nhập kho")
        }
      })
    } else {
      this.toastr.warning("Dữ liệu nhập vào không hợp lệ")
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
    this.inventoryService.exportInventoriesFromFile(this.selectedFile).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.Response) {
          if (event.status === 400) {
            this.toastr.error('Có lỗi xảy ra! File không đúng yêu cầu!')
            this.dialogRef.close({ errors: event.body })
          } else {
            this.toastr.success("Xuất kho thành công")
            this.dialogRef.close({ exportSuccess: true })
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

}