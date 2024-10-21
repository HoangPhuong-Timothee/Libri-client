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
import { AddPublisherFormComponent } from './admin-publisher/add-publisher-form/add-publisher-form.component';
import { EditPublisherFormComponent } from './admin-publisher/edit-publisher-form/edit-publisher-form.component';
import { AddGenreFormComponent } from './admin-genre/add-genre-form/add-genre-form.component';
import { EditGenreFormComponent } from './admin-genre/edit-genre-form/edit-genre-form.component';
import { AddAuthorFormComponent } from './admin-author/add-author-form/add-author-form.component';
import { EditAuthorFormComponent } from './admin-author/edit-author-form/edit-author-form.component';
// import { ImportAuthorsFormComponent } from './admin-author/import-authors-form/import-authors-form.component';
// import { ImportGenresFormComponent } from './admin-genre/import-genres-form/import-genres-form.component';
// import { ImportPublihsersFormComponent } from './admin-publisher/import-publihsers-form/import-publihsers-form.component';


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
    // ImportGenresFormComponent,
    // ImportPublihsersFormComponent,
    // ImportAuthorsFormComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
