import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UpdateUnitOfMeasureRequest } from 'src/app/core/models/unit-of-measure.model';
import { UnitOfMeasureService } from 'src/app/core/services/unit-of-measure.service';

@Component({
  selector: 'app-edit-unit-of-measure-form',
  templateUrl: './edit-unit-of-measure-form.component.html',
  styleUrls: ['./edit-unit-of-measure-form.component.css']
})
export class EditUnitOfMeasureFormComponent implements OnInit {

  constructor(
     private fb: FormBuilder,
    private uomService: UnitOfMeasureService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditUnitOfMeasureFormComponent>
  ) { }

  ngOnInit(): void {
    if (this.data.unitOfMeasure) {
      this.updateUnitOfMeasureForm.reset(this.data.unitOfMeasure)
    }
  }

  updateUnitOfMeasureForm = this.fb.group({
    id: [this.data.unitOfMeasure.id],
    name: ['', [Validators.required]],
    description: ['', [Validators.maxLength(255)]]
  })

  updateUnitOfMeasure() {
      if(this.updateUnitOfMeasureForm.valid) {
        let updateUnitOfMeasureRequest = this.updateUnitOfMeasureForm.value as UpdateUnitOfMeasureRequest
        this.uomService.updateUnitOfMeasure(updateUnitOfMeasureRequest).subscribe({
          next: (response) => {
            if (response) {
              this.toastr.success("Cập nhật đơn vị đo thành công")
              this.dialogRef.close({ success: true })
            }
          },
          error: (error) => {
              console.log("Có lỗi xảy ra: ", error)
              this.toastr.error('Cập nhật đơn vị đo thất bại!')
            }
        })
      }
    }

}
