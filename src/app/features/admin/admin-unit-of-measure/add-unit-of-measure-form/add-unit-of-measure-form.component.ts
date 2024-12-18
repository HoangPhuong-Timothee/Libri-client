import { HttpEventType } from '@angular/common/http';
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
    ngOnInit(): void {
      this.loadAllMeasureUnits()
    }

    addUnitOfMeasureForm = this.fb.group({
      name: ['', [Validators.required], [validateUnitOfMeasureExist(this.uomService)]],
      description: ['', [Validators.maxLength(255)]],
      conversionRate: [0, Validators.required],
      mappingUnitId: [0, [Validators.required]]
    })

    loadAllMeasureUnits() {
      this.uomService.getAllUnitOfMeasures().subscribe({
        next: response => this.measureUnitsList = response,
        error: error => console.log("Có lỗii xảy ra: ", error)
      })
    }

    addNewUnitOfMeasure(): void {
      if(this.addUnitOfMeasureForm.valid) {
        let addUnitOfMeasureRequest = this.addUnitOfMeasureForm.value as AddUnitOfMeasureRequest
        this.uomService.addNewUnitOfMeasure(addUnitOfMeasureRequest).subscribe({
          next: (response) => {
            if (response) {
              this.toastr.success("Thêm đơn vị đo mới thành công")
              this.dialogRef.close({ success: true })
            }
          },
          error: (error) => {
              console.log("Có lỗi xảy ra: ", error)
              this.toastr.error('Thêm đơn vị đo mới thất bại!')
            }
        })
      }
    }

    onFileSelected(event: any) {
      this.selectedFile = event.target.files[0]
    }

    submitFile() {
      if (!this.selectedFile) {
        this.toastr.warning('Chưa có file nào được tải lên')
        return
      }
      this.uomService.importUnitOfMeasuresFromFile(this.selectedFile).subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Response) {
            if (event.status === 400) {
              this.toastr.error('Có lỗi xảy ra! File không đúng yêu cầu!')
              this.dialogRef.close({ errors: event.body })
            } else {
              this.toastr.success("Thêm đơn vị đo thành công")
              this.dialogRef.close({ success: true })
            }
          }
        },
        error: (error) => {
          if (error.status === 400 && error.errors) {
            this.toastr.error('Có lỗi xảy ra! File không đúng yêu cầu!')
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
