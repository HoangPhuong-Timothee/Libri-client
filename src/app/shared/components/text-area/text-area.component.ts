import { Component, Input, Self } from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.css']
})
export class TextAreaComponent {

  @Input() label = ''

  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this
   }

   writeValue(obj: any): void { }
 
   registerOnChange(fn: any): void { }
 
   registerOnTouched(fn: any): void { }
 
   get control() {
     return this.controlDir.control as FormControl
   }

}
