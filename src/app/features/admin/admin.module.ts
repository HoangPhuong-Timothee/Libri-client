import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminBookComponent } from './admin-book/admin-book.component';
import { AdminAuthorComponent } from './admin-author/admin-author.component';
import { AdminGenreComponent } from './admin-genre/admin-genre.component';
import { AdminPublisherComponent } from './admin-publisher/admin-publisher.component';
import { AdminOrderComponent } from './admin-order/admin-order.component';
import { AdminInventoryComponent } from './admin-inventory/admin-inventory.component';


@NgModule({
  declarations: [
    AdminComponent,
    AdminBookComponent,
    AdminAuthorComponent,
    AdminGenreComponent,
    AdminPublisherComponent,
    AdminOrderComponent,
    AdminInventoryComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
