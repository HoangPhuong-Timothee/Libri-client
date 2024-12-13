import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-order-filter-dialog',
  templateUrl: './order-filter-dialog.component.html',
  styleUrls: ['./order-filter-dialog.component.css']
})
export class OrderFilterDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  applyFilters() {

  }

}
