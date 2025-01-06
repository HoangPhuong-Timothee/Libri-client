import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Inventory, InventoryTransaction } from 'src/app/core/models/inventory.model';
import { InventoryParams } from 'src/app/core/models/params.model';
import { InventoryService } from 'src/app/core/services/inventory.service';
import { ExportInventoriesFormComponent } from './export-inventories-form/export-inventories-form.component';
import { ExportInventoriesManualFormComponent } from './export-inventories-manual-form/export-inventories-manual-form.component';
import { ImportInventoriesFormComponent } from './import-inventories-form/import-inventories-form.component';
import { ImportInventoriesManualFormComponent } from './import-inventories-manual-form/import-inventories-manual-form.component';
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
    { field: 'bookTitle', header: 'Sách' },
    { field: 'quantity', header: 'Số lượng' },
    { field: 'unitOfMeasure', header: 'Đơn vị' },
    {
      field: 'inventoryStatus',
      header: 'Tình trạng kho',
      class: (row: Inventory) => {
        if (row.quantity >= 1 && row.quantity <= 20) return 'rounded text-white p-2 bg-warning fw-bold border border-warning'
        if (row.quantity > 20) return 'rounded text-white p-2 bg-success fw-bold border border-success'
        if (row.quantity < 1) return 'rounded text-white p-2 bg-danger fw-bold border border-danger'
        return ''
      }
    },
    { field: 'storeName', header: 'Hiệu sách' },
    {
      field: 'createInfo',
      header: 'Tạo bởi',
      class: () => {
        return 'fst-italic'
      }
    },
    {
      field: 'updateInfo',
      header: 'Cập nhật bởi',
      class: () => {
        return 'fst-italic'
      }
  }
  ]
  actions = [
    {
      label: 'Lịch sử kho',
      icon: 'visibility',
      tooltip: 'Xem lịch sử xuất/nhập kho của sách',
      action: (row: any) => {
        this.openBookInventoryTransactionsDialog(row)
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
    this.inventoryParams.search = ''
    this.getAllBookInventories()
  }

  getAllBookInventories() {
    this.inventoryService.getAllBookInventories().subscribe({
      next: response => {
        this.bookInventories = response.data
        this.totalInventories = response.count
      },
      error: error => {
        console.log("Có lỗi: ", error)
      }
    })
  }

  openImportInventoriesDialog() {
    const dialog = this.dialog.open(ImportInventoriesFormComponent, {
      minWidth: '200px',
      data: {
        title: 'Nhập phiếu nhập kho'
      }
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
      minWidth: '200px',
      data: {
        title: 'Nhập phiếu xuất kho'
      }
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

  openImportInventoriesManualDialog() {
    const dialog = this.dialog.open(ImportInventoriesManualFormComponent, {
      minWidth: '1500px',
      data: {
        title: 'Tạo phiếu nhập kho'
      }
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

  openExportInventoriesManualDialog() {
    const dialog = this.dialog.open(ExportInventoriesManualFormComponent, {
      minWidth: '1500px',
      data: {
        title: 'Tạo phiếu xuất kho'
      }
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
      data: {
        selectedGenreId: this.inventoryParams.genreId,
        selectedBookStoreId: this.inventoryParams.bookStoreId,
        selectedInventoryStatus: this.inventoryParams.inventoryStatus
      }
    })
    dialog.afterClosed().subscribe({
      next: result => {
        if (result) {
          const params = this.inventoryService.getInventoryParams()
          params.genreId = result.selectedGenreId
          params.bookStoreId = result.selectedBookStoreId
          params.inventoryStatus = result.selectedInventoryStatus
          params.pageIndex = 1
          this.inventoryService.setInventoryParams(params)
          this.inventoryParams = params
          this.getAllBookInventories()
        }
      }
    })
  }

  openBookInventoryTransactionsDialog(inventory: Inventory) {
    this.dialog.open(InventoryTransactionDialogComponent, {
      minWidth: '1200px',
      maxHeight: '500px',
      data: {
        title: `Lịch sử xuất/nhập kho của sách '${inventory.bookTitle}'`,
        inventory
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
