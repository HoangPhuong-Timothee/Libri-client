import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { InventoryTransaction } from 'src/app/core/models/inventory-transaction.model';
import { Inventory } from 'src/app/core/models/inventory.model';
import { InventoryParams } from 'src/app/core/models/params.model';
import { InventoryService } from 'src/app/core/services/inventory.service';
import { ExportInventoriesFormComponent } from './export-inventories-form/export-inventories-form.component';
import { ImportInventoriesFormComponent } from './import-inventories-form/import-inventories-form.component';
import { InventoryFilterDialogComponent } from './inventory-filter-dialog/inventory-filter-dialog.component';
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
    { field: 'createInfo', header: 'Thông tin tạo' },
    { field: 'updateInfo', header: 'Thông tin cập nhật' }
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
    private dialog: MatDialog
  )
  {
    this.inventoryParams = inventoryService.getInventoryParams()
  }

  ngOnInit(): void {
    this.getAllBookInventories()
    window.scrollTo({ top: 0, behavior: 'smooth' })
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

  openImportInventoriesDialog() {
    const dialog = this.dialog.open(ImportInventoriesFormComponent, {
      minWidth: '500px',
      data: {
        title: 'Nhập kho'
      },
      panelClass: 'dynamic-dialog'
    });
    dialog.afterClosed().subscribe({
      next: (result) => {
        if (result && result.importSucess) {
          const params = this.inventoryService.getInventoryParams()
          params.pageIndex = 1
          this.inventoryService.setInventoryParams(params)
          this.inventoryParams = params
          this.getAllBookInventories()
        }
      }
    })
  }

  openExportInventoriesDialog() {
    const dialog = this.dialog.open(ExportInventoriesFormComponent, {
      minWidth: '400px',
      data: {
        title: 'Xuất kho'
      },
      panelClass: 'dynamic-dialog'
    });
    dialog.afterClosed().subscribe({
      next: (result) => {
        if (result && result.exportSuccess) {
          const params = this.inventoryService.getInventoryParams()
          params.pageIndex = 1
          this.inventoryService.setInventoryParams(params)
          this.inventoryParams = params
          this.getAllBookInventories()
        }
      }
    })
  }

  openFilterDialog() {
    const dialog = this.dialog.open(InventoryFilterDialogComponent, {
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
      minWidth: '1200px',
      maxHeight: '500px',
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
