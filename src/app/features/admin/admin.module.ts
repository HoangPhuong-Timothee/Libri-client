import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddAuthorFormComponent } from './admin-author/add-author-form/add-author-form.component';
import { AdminAuthorComponent } from './admin-author/admin-author.component';
import { EditAuthorFormComponent } from './admin-author/edit-author-form/edit-author-form.component';
import { ImportAuthorsFormComponent } from './admin-author/import-authors-form/import-authors-form.component';
import { AddBookFormComponent } from './admin-book/add-book-form/add-book-form.component';
import { AdminBookComponent } from './admin-book/admin-book.component';
import { EditBookFormComponent } from './admin-book/edit-book-form/edit-book-form.component';
import { ImportBooksFormComponent } from './admin-book/import-books-form/import-books-form.component';
import { AddGenreFormComponent } from './admin-genre/add-genre-form/add-genre-form.component';
import { AdminGenreComponent } from './admin-genre/admin-genre.component';
import { EditGenreFormComponent } from './admin-genre/edit-genre-form/edit-genre-form.component';
import { ImportGenresFormComponent } from './admin-genre/import-genres-form/import-genres-form.component';
import { AdminInventoryComponent } from './admin-inventory/admin-inventory.component';
import { EditInventoryFormComponent } from './admin-inventory/edit-inventory-form/edit-inventory-form.component';
import { ImportInventoriesFormComponent } from './admin-inventory/import-inventories-form/import-inventories-form.component';
import { AdminOrderComponent } from './admin-order/admin-order.component';
import { AddPublisherFormComponent } from './admin-publisher/add-publisher-form/add-publisher-form.component';
import { AdminPublisherComponent } from './admin-publisher/admin-publisher.component';
import { EditPublisherFormComponent } from './admin-publisher/edit-publisher-form/edit-publisher-form.component';
import { ImportPublishersFormComponent } from './admin-publisher/import-publihsers-form/import-publishers-form.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';


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
    AddBookFormComponent,
    ImportBooksFormComponent,
    EditBookFormComponent,
    ImportGenresFormComponent,
    ImportPublishersFormComponent,
    ImportInventoriesFormComponent,
    EditInventoryFormComponent,
    ImportAuthorsFormComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
