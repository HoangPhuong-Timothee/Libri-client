import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { InventoryTransaction } from 'src/app/core/models/inventory-transaction.model';
import { Inventory } from 'src/app/core/models/inventory.model';
import { InventoryParams } from 'src/app/core/models/params.model';
import { InventoryService } from 'src/app/core/services/inventory.service';
import { BottomSheetComponent } from "./bottom-sheet/bottom-sheet.component";
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';
import { InventoryTransactionDialogComponent } from './inventory-transaction-dialog/inventory-transaction-dialog.component';

@Component({
  selector: 'app-admin-inventory',
  templateUrl: './admin-inventory.component.html',
  styleUrls: ['./admin-inventory.component.css']
})
export class AdminInventoryComponent implements OnInit {

  searchTerm: string = ''
  bookInventories: Inventory[] = []
  transactions: InventoryTransaction[] = []
  inventoryParams: InventoryParams
  totalInventories: number = 0
  columns = [
    { field: 'bookId', header: 'Mã sách' },
    { field: 'bookTitle' , header: 'Sách' },
    { field: 'quantity', header: 'Số lượng' },
    { field: 'bookStatus', header: 'Tình trạng' },
    { field: 'storeName', header: 'Hiệu sách' },
    { field: 'createInfo', header: 'Tạo kho' },
    { field: 'updateInfo', header: 'Cập nhật kho' }
  ]
  actions = [
    {
      label: 'Lịch sử kho',
      icon: 'visibility',
      tooltip: 'Xem lịch sử xuất/nhập kho của sách',
      action: (row: any) => {
        this.openBookInventoryTransactionsDialog(row.bookId, row.bookTitle, row.storeName)
      }
    }
  ]

  constructor(
    private inventoryService: InventoryService,
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet
  )
  {
    this.inventoryParams = inventoryService.getInventoryParams()
  }

  ngOnInit(): void {
    this.getAllBookInventories()
  }

  getAllBookInventories() {
    this.inventoryService.getAllBookInventories().subscribe({
      next: response => {
        this.bookInventories = response.data
        this.totalInventories = response.count
      },
      error: error => {
        console.log(error)
      }
    })
  }

  openBottomSheet() {
    const bottomSheet = this.bottomSheet.open(BottomSheetComponent)
    bottomSheet.afterDismissed().subscribe(
      result => {
        if (result && result.success) {
          console.log(result)
          const params = this.inventoryService.getInventoryParams()
          params.pageIndex = 1
          this.inventoryService.setInventoryParams(params)
          this.inventoryParams = params
          this.getAllBookInventories()
        }
      }
    )
  }

  openFilterDialog() {
    const dialog = this.dialog.open(FilterDialogComponent, {
      minWidth: '500px',
      autoFocus: false,
      data: {
        selectedGenreId: this.inventoryParams.genreId,
        selectedBookStoreId: this.inventoryParams.bookStoreId
      }
    })
    dialog.afterClosed().subscribe({
      next: result => {
        if (result) {
          const params = this.inventoryService.getInventoryParams()
          params.genreId = result.selectedGenreId
          params.bookStoreId = result.selectedBookStoreId
          params.pageIndex = 1
          this.inventoryService.setInventoryParams(params)
          this.inventoryParams = params
          this.getAllBookInventories()
        }
      }
    })
  }

  openBookInventoryTransactionsDialog(bookId: number, bookTitle: string, storeName: string) {
    this.dialog.open(InventoryTransactionDialogComponent, {
      minWidth: '630px',
      autoFocus: true,
      data: {
        title: `Lịch sử xuất/nhập kho của sách '${bookTitle}'`,
        bookId,
        storeName
      }
    })
  }

  onPageChange(event: PageEvent) {
    const params = this.inventoryService.getInventoryParams()
    params.pageIndex = event.pageIndex + 1
    params.pageSize = event.pageSize
    this.inventoryService.setInventoryParams(params)
    this.inventoryParams = params
    this.getAllBookInventories()
  }

  onSearch() {
    const params = this.inventoryService.getInventoryParams()
    params.search = this.searchTerm
    params.pageIndex = 1
    this.inventoryService.setInventoryParams(params)
    this.inventoryParams = params
    this.getAllBookInventories()
  }

  onReset() {
    if (this.searchTerm) {
      this.searchTerm = ''
    }
    this.inventoryParams = new InventoryParams()
    this.inventoryService.setInventoryParams(this.inventoryParams)
    this.getAllBookInventories()
  }

}
