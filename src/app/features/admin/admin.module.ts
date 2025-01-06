import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddAuthorFormComponent } from './admin-author/add-author-form/add-author-form.component';
import { AdminAuthorComponent } from './admin-author/admin-author.component';
import { EditAuthorFormComponent } from './admin-author/edit-author-form/edit-author-form.component';
import { AddBooksFormComponent } from './admin-book/add-books-form/add-books-form.component';
import { AdminBookDetailsComponent } from './admin-book/admin-book-details/admin-book-details.component';
import { AdminBookComponent } from './admin-book/admin-book.component';
import { BookFilterDialogComponent } from './admin-book/book-filter-dialog/book-filter-dialog.component';
import { AddBookstoreFormComponent } from './admin-bookstore/add-bookstore-form/add-bookstore-form.component';
import { AdminBookstoreComponent } from './admin-bookstore/admin-bookstore.component';
import { EditBookstoreFormComponent } from './admin-bookstore/edit-bookstore-form/edit-bookstore-form.component';
import { AddGenreFormComponent } from './admin-genre/add-genre-form/add-genre-form.component';
import { AdminGenreComponent } from './admin-genre/admin-genre.component';
import { EditGenreFormComponent } from './admin-genre/edit-genre-form/edit-genre-form.component';
import { AdminInventoryComponent } from './admin-inventory/admin-inventory.component';
import { ExportInventoriesFormComponent } from './admin-inventory/export-inventories-form/export-inventories-form.component';
import { ImportInventoriesFormComponent } from './admin-inventory/import-inventories-form/import-inventories-form.component';
import { InventoryFilterDialogComponent } from './admin-inventory/inventory-filter-dialog/inventory-filter-dialog.component';
import { InventoryTransactionDialogComponent } from './admin-inventory/inventory-transaction-dialog/inventory-transaction-dialog.component';
import { AdminOrderComponent } from './admin-order/admin-order.component';
import { AddPublisherFormComponent } from './admin-publisher/add-publisher-form/add-publisher-form.component';
import { AdminPublisherComponent } from './admin-publisher/admin-publisher.component';
import { EditPublisherFormComponent } from './admin-publisher/edit-publisher-form/edit-publisher-form.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { AdminComponent } from './admin.component';
import { OrderFilterDialogComponent } from './admin-order/order-filter-dialog/order-filter-dialog.component';
import { OrderDetailsDialogComponent } from './admin-order/order-details-dialog/order-details-dialog.component';
import { AdminUnitOfMeasureComponent } from './admin-unit-of-measure/admin-unit-of-measure.component';
import { AddUnitOfMeasureFormComponent } from './admin-unit-of-measure/add-unit-of-measure-form/add-unit-of-measure-form.component';
import { EditUnitOfMeasureFormComponent } from './admin-unit-of-measure/edit-unit-of-measure-form/edit-unit-of-measure-form.component';
import { ImportGenreFormComponent } from './admin-genre/import-genre-form/import-genre-form.component';
import { ImportAuthorFormComponent } from './admin-author/import-author-form/import-author-form.component';
import { ImportPublisherFormComponent } from './admin-publisher/import-publisher-form/import-publisher-form.component';
import { ImportMeasureUnitFormComponent } from './admin-unit-of-measure/import-measure-unit-form/import-measure-unit-form.component';
import { ImportBookstoreFormComponent } from './admin-bookstore/import-bookstore-form/import-bookstore-form.component';
import { ImportInventoriesManualFormComponent } from './admin-inventory/import-inventories-manual-form/import-inventories-manual-form.component';
import { ExportInventoriesManualFormComponent } from './admin-inventory/export-inventories-manual-form/export-inventories-manual-form.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminBookComponent,
    AdminAuthorComponent,
    AdminGenreComponent,
    AdminPublisherComponent,
    AdminOrderComponent,
    AdminInventoryComponent,
    AddPublisherFormComponent,
    EditPublisherFormComponent,
    AddGenreFormComponent,
    EditGenreFormComponent,
    AddAuthorFormComponent,
    EditAuthorFormComponent,
    AddBooksFormComponent,
    ImportInventoriesFormComponent,
    AdminBookDetailsComponent,
    InventoryFilterDialogComponent,
    BookFilterDialogComponent,
    AdminUserComponent,
    ExportInventoriesFormComponent,
    InventoryTransactionDialogComponent,
    AdminBookstoreComponent,
    AddBookstoreFormComponent,
    EditBookstoreFormComponent,
    OrderFilterDialogComponent,
    OrderDetailsDialogComponent,
    AdminUnitOfMeasureComponent,
    AddUnitOfMeasureFormComponent,
    EditUnitOfMeasureFormComponent,
    ImportGenreFormComponent,
    ImportAuthorFormComponent,
    ImportPublisherFormComponent,
    ImportMeasureUnitFormComponent,
    ImportBookstoreFormComponent,
    ImportInventoriesManualFormComponent,
    ExportInventoriesManualFormComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
