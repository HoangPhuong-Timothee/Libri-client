import { AbstractControl, AsyncValidatorFn, ValidatorFn } from "@angular/forms"
import { BehaviorSubject, catchError, debounceTime, finalize, map, of, switchMap, take, tap } from "rxjs"
import { BookService } from "src/app/core/services/book.service"
import { InventoryService } from "src/app/core/services/inventory.service"

export function validateBookExist(bookService: BookService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return control.valueChanges.pipe(
      debounceTime(1000),
      take(1),
      switchMap((bookTitle) => {
        return bookService.checkBookExistByTitle(bookTitle).pipe(
          map((result) => (result ? { bookExists: true } : null)),
          catchError(() => of(null)),
          finalize(() => control.markAllAsTouched())
        )
      })
    )
  }
}

export function validateBookInStore(bookService: BookService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    const bookTitle = control.parent?.get('bookTitle')?.value
    const bookStoreId = control.value
    if (bookTitle && bookStoreId) {
      return bookService.checkBookExistInBookStore(bookTitle, bookStoreId).pipe(
        map((result) => result ? null : { bookExistInStore: true }),
        catchError(() => of(null)),
    )} else {
        return of(null)
      }
    }
}

export function validateQuantityInStore(inventoryService: InventoryService, availableQuantity$: BehaviorSubject<number>): AsyncValidatorFn {
  return (control: AbstractControl) => {
    const bookTitle = control.parent?.get('bookTitle')?.value
    const bookStoreId = control.parent?.get('bookStoreId')?.value
    const inputQuatity = control.value
    if (bookTitle && bookStoreId) {
        return control.valueChanges.pipe(
         debounceTime(1000),
         take(1),
         switchMap(() => {
          return inventoryService.getBookQuantityByTitleAndStoreId(bookTitle, bookStoreId).pipe(
            debounceTime(1000),
            tap(result => availableQuantity$.next(result)),
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

export function validatePastDate(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) {
      return null
    }
    const today = new Date()
    const inputDate = new Date(control.value)
    return inputDate <= today ? null : { 'futureDate': { value: control.value } }
  }
}
