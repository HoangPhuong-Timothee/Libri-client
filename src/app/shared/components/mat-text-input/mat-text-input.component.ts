import { Component, Input, Self } from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'app-mat-text-input',
  templateUrl: './mat-text-input.component.html',
  styleUrls: ['./mat-text-input.component.css']
})
export class MatTextInputComponent {

  @Input() label = '';
  @Input() type = 'text';

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this
  }

  writeValue(obj: any): void {
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  get control() {
    return this.ngControl.control as FormControl
  }

}
