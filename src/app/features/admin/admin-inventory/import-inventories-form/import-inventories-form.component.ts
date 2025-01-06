import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InventoryService } from 'src/app/core/services/inventory.service';

@Component({
  selector: 'app-import-inventories-form',
  templateUrl: './import-inventories-form.component.html',
  styleUrls: ['./import-inventories-form.component.css']
})
export class ImportInventoriesFormComponent {

  fileName: string = 'Chọn file tải lên.'
  errorsList: any[] = []
  selectedFile: File | null = null
  columns = [
    { field: 'location', header: 'Vị trí' },
    { field: 'details', header: 'Nội dung' }
  ]

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private inventoryService: InventoryService,
    public dialogRef: MatDialogRef<ImportInventoriesFormComponent>
  ) { }

  handleSubmitSuccess(success: boolean) {
    if (success) {
      this.dialogRef.close({ importSuccess: true })
    }
  }

  importInventoriesFromFile(file: File) {
    return this.inventoryService.importInventoriesFromFile(file)
  }
}

