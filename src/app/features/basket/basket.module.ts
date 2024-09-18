import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketRoutingModule } from './basket-routing.module';
import { BasketComponent } from './basket.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BasketItemComponent } from './basket-item/basket-item.component';

@NgModule({
  declarations: [
    BasketComponent,
    BasketItemComponent,
  ],
  imports: [
    CommonModule,
    BasketRoutingModule,
    SharedModule
  ]
})
export class BasketModule { }
