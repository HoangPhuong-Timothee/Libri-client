import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InventoryTransaction } from 'src/app/core/models/inventory-transaction.model';
import { InventoryService } from 'src/app/core/services/inventory.service';

@Component({
  selector: 'app-inventory-transaction-dialog',
  templateUrl: './inventory-transaction-dialog.component.html',
  styleUrls: ['./inventory-transaction-dialog.component.css']
})
export class InventoryTransactionDialogComponent implements OnInit {

  transactions: InventoryTransaction[] = []

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private inventoryService: InventoryService
  ) { }

  ngOnInit(): void {
    this.loadInventoryTransactions(this.data.bookId, this.data.storeName)
  }

  loadInventoryTransactions(bookId: number, storeName: string) {
    return this.inventoryService.getBookInventoryTransactions(bookId, storeName).subscribe({
      next: response => this.transactions = response,
      error: error => console.log("Có lỗi: ", error)
    })
  }

}
