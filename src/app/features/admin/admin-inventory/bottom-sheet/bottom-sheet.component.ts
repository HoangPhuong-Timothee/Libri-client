import { Component } from '@angular/core';
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { MatDialog } from '@angular/material/dialog';
import { ErrorDetails } from "../../../../core/models/error-response.model";
import { ExportInventoryFileFormComponent } from '../export-inventory-file-form/export-inventory-file-form.component';
import { ExportInventoryFormComponent } from "../export-inventory-form/export-inventory-form.component";
import { ImportInventoriesFormComponent } from "../import-inventories-form/import-inventories-form.component";
import { ImportInventoryFileFormComponent } from '../import-inventory-file-form/import-inventory-file-form.component';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.css']
})
export class BottomSheetComponent {

  constructor(
    private dialog: MatDialog,
    private bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>
  ) { }

  //Import/export book inventories manually
  openImportInventoriesDialog() {
    this.bottomSheetRef.dismiss()
    const dialog = this.dialog.open(ImportInventoriesFormComponent, {
      minWidth: '800px',
      autoFocus: true,
      data: {
        title: 'Nhập kho'
      },
      panelClass: 'dynamic-dialog'
    });
    dialog.afterClosed().subscribe({
      next: (result) => {

      }
    })
  }

  openExportInventoriesDialog() {
    this.bottomSheetRef.dismiss()
    const dialog = this.dialog.open(ExportInventoryFormComponent, {
      minWidth: '500px',
      autoFocus: true,
      data: {
        title: 'Xuất kho'
      },
      panelClass: 'dynamic-dialog'
    })
    dialog.afterClosed().subscribe({
      next: (result) => {

      }
    })
  }

  //Import/export book inventories from file
  openImportInventoriesFromFileDialog(errors?: ErrorDetails[]) {
    const dialog = this.dialog.open(ImportInventoryFileFormComponent, {
      minWidth: '800px',
      autoFocus: true,
      data: {
        title: 'Nhập kho từ file',
        errors: errors
      },
      panelClass: 'dynamic-dialog'
    });
    dialog.afterClosed().subscribe({
      next: (result) => {
        if (result && result.fileUploaded) {
          this.bottomSheetRef.dismiss({ success: true })
        } else if (result && result.errors) {
          this.openImportInventoriesFromFileDialog(result.errors)
        }
      }
    })
  }

  openExportInventoriesFromFileDialog(errors?: ErrorDetails[]) {
    const dialog = this.dialog.open(ExportInventoryFileFormComponent, {
      minWidth: '500px',
      autoFocus: true,
      data: {
        title: 'Xuất kho từ file',
        errors: errors
      },
      panelClass: 'dynamic-dialog'
    });
    dialog.afterClosed().subscribe({
      next: (result) => {
        if (result && result.fileUploaded) {
          this.bottomSheetRef.dismiss({ success: true })
        } else if (result && result.errors) {
          this.openExportInventoriesFromFileDialog(result.errors)
        }
      }
    })
  }

}
