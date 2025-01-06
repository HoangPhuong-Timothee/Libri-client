import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BookStore } from 'src/app/core/models/book-store.model';
import { ImportInventoriesRequest } from 'src/app/core/models/inventory.model';
import { UnitOfMeasure } from 'src/app/core/models/unit-of-measure.model';
import { BookService } from 'src/app/core/services/book.service';
import { BookstoreService } from 'src/app/core/services/bookstore.service';
import { InventoryService } from 'src/app/core/services/inventory.service';
import { UnitOfMeasureService } from 'src/app/core/services/unit-of-measure.service';
import { validateBookExist } from 'src/app/shared/helpers/validates/validate-exist';
import { validatePastDate } from 'src/app/shared/helpers/validates/validate-inventory-inputs';

@Component({
  selector: 'app-import-inventories-manual-form',
  templateUrl: './import-inventories-manual-form.component.html',
  styleUrls: ['./import-inventories-manual-form.component.css']
})
export class ImportInventoriesManualFormComponent implements OnInit {

  importForm!: FormGroup
  errorsList: any[] = []
  headerColumns: string[] = ['Tên sách', 'ISBN', 'Hiệu sách', 'Số lượng', 'Đơn vị', 'Ngày nhập kho', 'Ghi chú', '']
  bookStoresList: BookStore[] = []
  measureUnitsList: UnitOfMeasure[] = []

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private bookStoreService: BookstoreService,
    private bookService: BookService,
    private measureUnitService: UnitOfMeasureService,
    private inventoryService: InventoryService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<ImportInventoriesManualFormComponent>
  ) { }

  ngOnInit(): void {
    this.loadAllBookStores()
    this.loadAllMeasureUnits()
    this.initializeForm()
  }

  initializeForm() {
    this.importForm = this.fb.group({
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

  loadAllMeasureUnits() {
    this.measureUnitService.getAllUnitOfMeasures().subscribe({
      next: response => this.measureUnitsList = response,
      error: error => console.log("Có lỗi xảy ra: ", error)
    })
  }

  createFormGroup(): FormGroup {
    return this.fb.group({
      bookTitle: ['', [Validators.required], [validateBookExist(this.bookService)]],
      unitOfMeasureId: ['', [Validators.required]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      bookStoreId: ['', [Validators.required]],
      importDate: ['', [Validators.required, validatePastDate()]],
      importNotes: ['', Validators.maxLength(100)]
    })
  }

  addRow() {
    this.rows.push(this.createFormGroup())
  }

  get rows(): FormArray {
    return this.importForm.get('rows') as FormArray
  }

  removeFormGroup(index: number) {
    this.rows.removeAt(index)
  }

  submitForm() {
    if (this.importForm.valid) {
        const requestData: ImportInventoriesRequest[] = this.importForm.value.rows
        this.inventoryService.importInventoriesManual(requestData).subscribe({
          next: (response) => {
            this.toastr.success(response.message)
            this.dialogRef.close({ importSuccess: true })
          },
          error: (error) => {
            console.log("Có lỗi xảy ra: ", error)
            this.toastr.error(error.message)
          }
      })
    } else {
      this.toastr.warning("Dữ liệu nhập vào không hợp lệ")
    }
  }
}
