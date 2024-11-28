import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormArray, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { catchError, debounceTime, finalize, map, of, switchMap, take, tap } from 'rxjs';
import { BookStore } from 'src/app/core/models/book-store.model';
import { ExportInventoriesRequest } from 'src/app/core/models/inventory.model';
import { BookService } from 'src/app/core/services/book.service';
import { BookstoreService } from 'src/app/core/services/bookstore.service';
import { InventoryService } from 'src/app/core/services/inventory.service';

@Component({
  selector: 'app-export-inventories-form',
  templateUrl: './export-inventories-form.component.html',
  styleUrls: ['./export-inventories-form.component.css']
})
export class ExportInventoriesFormComponent implements OnInit {

  exportForm!: FormGroup
  availableQuantity?: number
  headerColumns: string[] = ['Tên sách', 'Hiệu sách', 'Số lượng xuất', 'Ngày xuất', 'Ghi chú xuất kho', '']
  bookStoresList: BookStore[] = []

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

  createFormGroup(): FormGroup {
    return this.fb.group({
      bookTitle: ['', [Validators.required], [this.validateBookExist()]],
      quantity: [0, [Validators.required, Validators.min(0)], [this.validateQuantityInStore()]],
      bookStoreId: ['', [Validators.required], [this.validateBookInStore()]],
      exportDate: ['', [Validators.required, this.validatePastDate()]],
      exportNotes: ['', [Validators.maxLength(100)]]
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

  onSubmit(): void {
    if (this.exportForm.valid) {
      const requestData: ExportInventoriesRequest[] = this.exportForm.value.rows
      this.inventoryService.exportInventoriesManual(requestData).subscribe({
        next: response => {
          if (response) {
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

  validateBookExist(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        debounceTime(1000),
        take(1),
        switchMap((bookTitle) => {
          return this.bookService.checkBookExistByTitle(bookTitle).pipe(
            map((result) => (result ? { bookExists: true } : null)),
            catchError(() => of(null)),
            finalize(() => control.markAllAsTouched())
          )
        })
      )
    }
  }

  validateBookInStore(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      const bookTitle = control.parent?.get('bookTitle')?.value
      const bookStoreId = control.value
      if (bookTitle && bookStoreId) {
        return this.bookService.checkBookExistInBookStore(bookTitle, bookStoreId).pipe(
          map((result) => result ? null : { bookExistInStore: true }),
          catchError(() => of(null)),
      )} else {
          return of(null)
        }
      }
  }

  validateQuantityInStore(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      const bookTitle = control.parent?.get('bookTitle')?.value
      const bookStoreId = control.parent?.get('bookStoreId')?.value
      const inputQuatity = control.value
      if (bookTitle && bookStoreId) {
          return control.valueChanges.pipe(
           debounceTime(1000),
           take(1),
           switchMap(() => {
            return this.inventoryService.getBookQuantityByTitleAndStoreId(bookTitle, bookStoreId).pipe(
              debounceTime(1000),
              tap(result => this.availableQuantity = result),
              map((result) => result >= inputQuatity ? null : { validQuantity: true }),
              catchError(() => of(null))
            )
           })
          )
      } else {
          return of(null)
        }
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
