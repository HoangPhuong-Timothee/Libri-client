import { AbstractControl, AsyncValidatorFn, ValidatorFn } from "@angular/forms"
import { debounceTime, finalize, map, switchMap, take } from "rxjs"
import { AuthService } from "src/app/core/services/auth.service"

export function validateEmailExist(authService: AuthService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return control.valueChanges.pipe(
      debounceTime(1000),
      take(1),
      switchMap(() => {
        return authService.checkEmailExists(control.value).pipe(
          map((result) => (result ? { emailExists: true } : null)),
          finalize(() => control.markAllAsTouched())
        )
      })
    )
  }
}

export function validateMatchValues(matchTo: string): ValidatorFn {
  return (control: AbstractControl) => {
    const parent = control?.parent
    const matchControl = parent ? parent.get(matchTo) : null
    if (!parent || !matchControl) {
      return null
    }
    return control.value === matchControl.value ? null : { isMatching: true }
  }
}
