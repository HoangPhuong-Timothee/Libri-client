import { Component } from '@angular/core';
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ErrorDetails } from "../../../../core/models/error-response.model";
import { ExportInventoriesFormComponent } from "../export-inventories-form/export-inventories-form.component";
import { ExportInventoryFileFormComponent } from '../export-inventory-file-form/export-inventory-file-form.component';
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
    private toastr: ToastrService,
    private bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>
  ) { }

  //Import/export book inventories manually
  openImportInventoriesDialog() {
    const dialog = this.dialog.open(ImportInventoriesFormComponent, {
      minWidth: '900px',
      minHeight: '400px',
      autoFocus: true,
      data: {
        title: 'Nhập kho'
      },
      panelClass: 'dynamic-dialog'
    });
    dialog.afterClosed().subscribe({
      next: (result) => {
        if (result && result.importSuccess) {
          this.toastr.success("Nhập kho thành công")
          this.bottomSheetRef.dismiss({ success: true })
        }
      }
    })
  }

  openExportInventoriesDialog() {
    this.bottomSheetRef.dismiss()
    const dialog = this.dialog.open(ExportInventoriesFormComponent, {
      minWidth: '900px',
      minHeight: '400px',
      autoFocus: true,
      data: {
        title: 'Xuất kho'
      },
      panelClass: 'dynamic-dialog'
    })
    dialog.afterClosed().subscribe({
      next: (result) => {
        if (result && result.exportSuccess) {
          this.toastr.success("Xuất kho thành công")
          this.bottomSheetRef.dismiss({ success: true })
        }
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
