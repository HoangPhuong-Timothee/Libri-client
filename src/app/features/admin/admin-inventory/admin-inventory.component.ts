import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { firstValueFrom } from 'rxjs';
import { Inventory } from 'src/app/core/models/inventory.model';
import { InventoryParams } from 'src/app/core/models/params.model';
import { DialogService } from 'src/app/core/services/dialog.service';
import { InventoryService } from 'src/app/core/services/inventory.service';
import { EditInventoryFormComponent } from './edit-inventory-form/edit-inventory-form.component';
import { ImportInventoriesFormComponent } from './import-inventories-form/import-inventories-form.component';

@Component({
  selector: 'app-admin-inventory',
  templateUrl: './admin-inventory.component.html',
  styleUrls: ['./admin-inventory.component.css']
})
export class AdminInventoryComponent implements OnInit {

  searchTerm: string = ''
  bookInventories: Inventory[] = []
  inventoryParams = new InventoryParams()
  totalInventories = 0
  columns = [
    { field: 'bookId', header: 'Mã sách' },
    { field: ['bookTitle', 'bookThumbnail'], header: 'Sách', haveImage: true },
    { field: 'quantity', header: 'Số lượng kho' },
    { field: 'updatedAt', header: 'Ngày nhập kho' },
    { field: 'updatedBy', header: 'Nhập kho bởi' }
  ]
  actions = [
    {
      label: 'Cập nhật',
      icon: 'edit',
      tooltip: 'Cập nhật kho',
      action: (row: any) => {
        this.openUpdateBookInventoryDialog(row)
      }
    }
  ]

  constructor(
    private inventoryService: InventoryService,
    private dialog: MatDialog,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.searchTerm = ''
    this.getAllBookInvnetories()
  }

  getAllBookInvnetories() {
    this.inventoryService.getAllBookInventories(this.inventoryParams).subscribe({
      next: reponse => {
        if (reponse.data) {
          this.bookInventories = reponse.data
          this.totalInventories = reponse.count
        }
      }
    })
  }

  onPageChange(event: PageEvent) {
    this.inventoryParams.pageIndex = event.pageIndex + 1
    this.inventoryParams.pageSize = event.pageSize
    this.getAllBookInvnetories()
  }

  onSearch() {
    this.inventoryParams.search = this.searchTerm
    this.inventoryParams.pageIndex = 1
    this.getAllBookInvnetories()
  }

  onReset() {
    if (this.searchTerm) {
      this.searchTerm = ''
    }
    this.inventoryParams = new InventoryParams()
    this.getAllBookInvnetories()
  }

  openImportBookInventoriesDialog(errors?: Array<{ location: string; message: string }>) {
    const dialog = this.dialog.open(ImportInventoriesFormComponent, {
      minWidth: '500px',
      autoFocus: false,
      data: {
        title: 'Nhập dữ liệu kho',
        errors: errors || []
      },
      panelClass: 'dynamic-dialog'
    });
    dialog.afterClosed().subscribe({
      next: async (result) => {
        if (result && result.fileUploaded) {
          this.inventoryParams.pageIndex = 1
          this.getAllBookInvnetories()
        } else if (result && result.errors) {
          this.openImportBookInventoriesDialog(result.errors)
        }
      }
    })
  }

  openUpdateBookInventoryDialog(inventory: Inventory) {
    const dialog = this.dialog.open(EditInventoryFormComponent, {
      minWidth: '500px',
      data: {
        title: 'Cập nhật kho sách',
        inventory
      }
    })
    dialog.afterClosed().subscribe({
      next: async result => {
        if (result) {
          await firstValueFrom(this.inventoryService.updateBookInventory(result.inventory.bookId, result.quantity))
          const index = this.bookInventories.findIndex(p => p.bookId === result.inventory.bookId)
          if (index !== -1) {
            this.bookInventories[index] = result.inventory
          }
        }
      }
    })
  }

}
