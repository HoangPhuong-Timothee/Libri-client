import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { InventoryTransaction } from 'src/app/core/models/inventory.model';
import { InventoryTransactionParams } from 'src/app/core/models/params.model';
import { InventoryService } from 'src/app/core/services/inventory.service';

@Component({
  selector: 'app-inventory-transaction-dialog',
  templateUrl: './inventory-transaction-dialog.component.html',
  styleUrls: ['./inventory-transaction-dialog.component.css']
})
export class InventoryTransactionDialogComponent implements OnInit {

  transactions: InventoryTransaction[] = []
  invTranParams = new InventoryTransactionParams()
  selectedType: string = ''
  startDate?: Date
  endDate?: Date

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private inventoryService: InventoryService
  ) { }

  ngOnInit(): void {
    this.loadInventoryTransactions(this.data.bookId, this.data.storeName)
  }

  loadInventoryTransactions(bookId: number, storeName: string) {
    this.invTranParams.startDate = this.startDate
    this.invTranParams.endDate = this.endDate
    this.invTranParams.transactionType = this.selectedType
    console.log(this.invTranParams.transactionType)
    return this.inventoryService.getBookInventoryTransactions(bookId, storeName, this.invTranParams).subscribe({
      next: response => {
        this.transactions = response.map(transaction => ({
          ...transaction,
          showDetails: false
        }))
      },
      error: error => console.log("Có lỗi: ", error)
    })
  }

  toggleShowDetails(transaction: InventoryTransaction) {
    transaction.showDetails = !transaction.showDetails
    const index = this.transactions.findIndex(t => t.transactionId === transaction.transactionId)
    if (index !== -1) {
      this.transactions[index] = { ...transaction }
    }
  }

  applyFilters() {
    if (this.startDate && this.endDate && this.startDate >= this.endDate) {
      this.toastr.error("Ngày bắt đầu phải nhỏ hơn ngày kết thúc")
      return
    }
    this.invTranParams.transactionType = this.selectedType
    this.invTranParams.startDate = this.startDate
    this.invTranParams.endDate = this.endDate
    this.loadInventoryTransactions(this.data.bookId, this.data.storeName)
  }

  onReset() {
    if (this.selectedType) {
      this.selectedType = ''
    }
    if (this.startDate) {
      this.startDate = undefined
    }
    if (this.endDate) {

      this.endDate = undefined
    }
    this.invTranParams = new InventoryTransactionParams()
    this.loadInventoryTransactions(this.data.bookId, this.data.storeName)
  }

}
