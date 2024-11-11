import { Component, Input, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.css']
})
export class SelectInputComponent {

  @Input() label = '';
  @Input() options: string[] = [];

  filteredOptions: string[] = [];
  value: string = '';
  onChange: any = () => {};
  onTouched: any = () => {};

  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this
  }

  ngOnInit() {
    this.filteredOptions = this.options;
  }

  onSearchChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const searchValue = target.value;
    this.filteredOptions = this.options.filter(option =>
      option.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  onSelect(event: MatSelectChange) {
    this.value = event.value;
    this.onChange(this.value);
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

}


