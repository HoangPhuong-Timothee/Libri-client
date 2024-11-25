import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddAuthorFormComponent } from './admin-author/add-author-form/add-author-form.component';
import { AdminAuthorComponent } from './admin-author/admin-author.component';
import { EditAuthorFormComponent } from './admin-author/edit-author-form/edit-author-form.component';
import { ImportAuthorsFormComponent } from './admin-author/import-authors-form/import-authors-form.component';
import { AdminBookDetailsComponent } from './admin-book/admin-book-details/admin-book-details.component';
import { AdminBookComponent } from './admin-book/admin-book.component';
import { BookFilterDialogComponent } from './admin-book/book-filter-dialog/book-filter-dialog.component';
import { ImportBooksFormComponent } from './admin-book/import-books-form/import-books-form.component';
import { AddGenreFormComponent } from './admin-genre/add-genre-form/add-genre-form.component';
import { AdminGenreComponent } from './admin-genre/admin-genre.component';
import { EditGenreFormComponent } from './admin-genre/edit-genre-form/edit-genre-form.component';
import { ImportGenresFormComponent } from './admin-genre/import-genres-form/import-genres-form.component';
import { AdminInventoryComponent } from './admin-inventory/admin-inventory.component';
import { FilterDialogComponent } from './admin-inventory/filter-dialog/filter-dialog.component';
import { ImportInventoriesFormComponent } from './admin-inventory/import-inventories-form/import-inventories-form.component';
import { AdminOrderComponent } from './admin-order/admin-order.component';
import { AddPublisherFormComponent } from './admin-publisher/add-publisher-form/add-publisher-form.component';
import { AdminPublisherComponent } from './admin-publisher/admin-publisher.component';
import { EditPublisherFormComponent } from './admin-publisher/edit-publisher-form/edit-publisher-form.component';
import { ImportPublishersFormComponent } from './admin-publisher/import-publihsers-form/import-publishers-form.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { ExportInventoryFormComponent } from './admin-inventory/export-inventory-form/export-inventory-form.component';
import { BottomSheetComponent } from './admin-inventory/bottom-sheet/bottom-sheet.component';
import { ImportInventoryFileFormComponent } from './admin-inventory/import-inventory-file-form/import-inventory-file-form.component';
import { ExportInventoryFileFormComponent } from './admin-inventory/export-inventory-file-form/export-inventory-file-form.component';


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
    ImportBooksFormComponent,
    ImportGenresFormComponent,
    ImportPublishersFormComponent,
    ImportInventoriesFormComponent,
    ImportAuthorsFormComponent,
    AdminBookDetailsComponent,
    FilterDialogComponent,
    BookFilterDialogComponent,
    AdminUserComponent,
    ExportInventoryFormComponent,
    BottomSheetComponent,
    ImportInventoryFileFormComponent,
    ExportInventoryFileFormComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
