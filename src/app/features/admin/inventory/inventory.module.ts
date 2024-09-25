import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryListComponent } from './inventory-list.component';
import { UpdateInventoryComponent } from './update-inventory/update-inventory.component';


@NgModule({
  declarations: [
    InventoryListComponent,
    UpdateInventoryComponent
  ],
  imports: [
    CommonModule,
    InventoryRoutingModule
  ]
})
export class InventoryModule { }
