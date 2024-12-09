import { AbstractControl, AsyncValidatorFn, ValidatorFn } from "@angular/forms"
import { BehaviorSubject, catchError, debounceTime, map, of, switchMap, take, tap } from "rxjs"
import { InventoryService } from "src/app/core/services/inventory.service"

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
