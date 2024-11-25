import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, finalize, map, switchMap, take } from 'rxjs';
import { BookStore } from "src/app/core/models/book-store.model";
import { BookService } from 'src/app/core/services/book.service';
import { BookstoreService } from "src/app/core/services/bookstore.service";
import { InventoryService } from 'src/app/core/services/inventory.service';

@Component({
  selector: 'app-import-inventories-form',
  templateUrl: './import-inventories-form.component.html',
  styleUrls: ['./import-inventories-form.component.css']
})
export class ImportInventoriesFormComponent implements OnInit {

  bookStoresList: BookStore[] = []
  rowArr: any [] = []
  headerTitle = ['STT', 'Tiều đề sách', 'Số lượng nhập', 'Ngày nhập']
  constructor(
    private bookService: BookService,
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    private bookStoreService: BookstoreService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ImportInventoriesFormComponent>,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadAllBookStore()
  }


  loadAllBookStore() {
    this.bookStoreService.getAllBookStores().subscribe({
      next: response => this.bookStoresList = response,
      error: error => console.log("Có lỗi: ", error)
    })
  }

  addRow() {
    this.rowArr.push({ bookTitle: '', quantity: 0, bookStoreId: '', date: '' })
  }

  checkBookExists(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        debounceTime(1000),
        take(1),
        switchMap(() => {
          return this.bookService.checkBookExists(control.value).pipe(
            map((result) => (result ? { bookExists: true } : null)),
            finalize(() => control.markAllAsTouched())
          )
        })
      )
    }
  }

  onSubmit() {

  }
}
