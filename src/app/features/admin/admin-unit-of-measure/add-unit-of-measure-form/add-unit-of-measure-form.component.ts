import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AddUnitOfMeasureRequest, UnitOfMeasure } from 'src/app/core/models/unit-of-measure.model';
import { UnitOfMeasureService } from 'src/app/core/services/unit-of-measure.service';
import { validateUnitOfMeasureExist } from 'src/app/shared/helpers/validates/validate-exist';

@Component({
  selector: 'app-add-unit-of-measure-form',
  templateUrl: './add-unit-of-measure-form.component.html',
  styleUrls: ['./add-unit-of-measure-form.component.css']
})
export class AddUnitOfMeasureFormComponent implements OnInit {

    fileName: string = 'Chọn file tải lên.'
    errorsList: any[] = []
    selectedFile: File | null = null
    columns = [
      { field: 'location', header: 'Vị trí' },
      { field: 'details', header: 'Nội dung' }
    ]
    importFileMode: boolean = true
    measureUnitsList: UnitOfMeasure[] = []

    constructor(
      private fb: FormBuilder,
      private toastr: ToastrService,
      private uomService: UnitOfMeasureService,
      private dialogRef: MatDialogRef<AddUnitOfMeasureFormComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    addUnitOfMeasureForm = this.fb.group({
      name: ['', [Validators.required], [validateUnitOfMeasureExist(this.uomService)]],
      description: ['', [Validators.maxLength(255)]],
      conversionRate: [0, Validators.required],
      mappingUnitId: [0, [Validators.min(1)]]
    })

    ngOnInit(): void {
      this.loadAllMeasureUnits()
    }

    loadAllMeasureUnits() {
      this.uomService.getAllUnitOfMeasures().subscribe({
        next: response => this.measureUnitsList = response,
        error: error => console.log("Có lỗi xảy ra: ", error)
      })
    }

    addNewUnitOfMeasure(): void {
      if(this.addUnitOfMeasureForm.valid) {
        let addUnitOfMeasureRequest = this.addUnitOfMeasureForm.value as AddUnitOfMeasureRequest
        this.uomService.addNewUnitOfMeasure(addUnitOfMeasureRequest).subscribe({
          next: (response) => {
            this.toastr.success(response.message)
            this.dialogRef.close({ success: true })
          },
          error: (error) => {
            console.log("Có lỗi xảy ra: ", error)
            this.toastr.error(error.message)
          }
        })
      }
    }

    onFileSelected(event: any) {
      this.selectedFile = event.target.files[0]
      this.fileName = this.selectedFile ? this.selectedFile.name : 'Chọn file tải lên.'
    }

    submitFile() {
      if (!this.selectedFile) {
        this.toastr.warning('Chưa có file nào được tải lên')
        return
      }
      this.uomService.importUnitOfMeasuresFromFile(this.selectedFile).subscribe({
        next: (response) => {
          this.toastr.success(response.message)
          this.dialogRef.close({ success: true })
        },
        error: (error) => {
          if (error.statusCode === 400) {
            this.toastr.error(error.message)
            this.errorsList = error.errors
          } else {
            this.toastr.error('Lỗi không xác định! Vui lòng thử lại.')
            this.dialogRef.close()
          }
        }
      })
    }

    changeMode() {
      this.importFileMode =!this.importFileMode
    }
}
