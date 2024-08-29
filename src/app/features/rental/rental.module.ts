import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentalComponent } from './rental.component';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';



@NgModule({
  declarations: [
    RentalComponent,
    RentalDetailComponent
  ],
  imports: [
    CommonModule
  ]
})
export class RentalModule { }
