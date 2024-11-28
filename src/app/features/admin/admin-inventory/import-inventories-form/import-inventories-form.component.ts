import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormArray, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, finalize, map, switchMap, take } from 'rxjs';
import { BookStore } from 'src/app/core/models/book-store.model';
import { ImportInventoriesRequest } from 'src/app/core/models/inventory.model';
import { BookService } from 'src/app/core/services/book.service';
import { BookstoreService } from 'src/app/core/services/bookstore.service';
import { InventoryService } from 'src/app/core/services/inventory.service';

@Component({
  selector: 'app-import-inventories-form',
  templateUrl: './import-inventories-form.component.html',
  styleUrls: ['./import-inventories-form.component.css']
})
export class ImportInventoriesFormComponent implements OnInit {

  importForm!: FormGroup
  isCheckedAll: boolean = false
  headerColumns: string[] = ['Tên sách', 'Hiệu sách', 'Số lượng nhập', 'Ngày nhập', 'Ghi chú nhập kho', '']
  bookStoresList: BookStore[] = []

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private bookStoreService: BookstoreService,
    private bookService: BookService,
    private inventoryService: InventoryService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<ImportInventoriesFormComponent>
  ) { }

  ngOnInit(): void {
    this.loadAllBookStores()
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

  createFormGroup(): FormGroup {
    return this.fb.group({
      bookTitle: ['', [Validators.required], [this.validateBookExist()]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      bookStoreId: ['', [Validators.required]],
      importDate: ['', [Validators.required, this.validatePastDate()]],
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

  onSubmit(): void {
    if (this.importForm.valid) {
      const requestData: ImportInventoriesRequest[] = this.importForm.value.rows
      this.inventoryService.importInventoriesManual(requestData).subscribe({
        next: response => {
          if (response) {
            this.dialogRef.close({ importSuccess: true })
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

  validateBookExist(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        debounceTime(1000),
        take(1),
        switchMap(() => {
          return this.bookService.checkBookExistByTitle(control.value).pipe(
            map((result) => (result ? { bookExist: true } : null)),
            finalize(() => control.markAllAsTouched())
          )
        })
      )
    }
  }

  validatePastDate(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null
      }
      const today = new Date()
      const inputDate = new Date(control.value)
      return inputDate <= today ? null : { 'futureDate': { value: control.value } }
    }
  }

}
