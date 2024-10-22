import { Component, Input, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.css']
})
export class InputSelectComponent {

  @Input() label = ''
  @Input() options: { id: number; name: string }[] = []
  value: number = 0
  onChange: any = () => {}
  onTouched: any = () => {}

  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this
  }

  onSelect(event: MatSelectChange) {
    this.value = event.value
    this.onChange(this.value)
  }

   writeValue(value: any): void {
    this.value = value
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

}
