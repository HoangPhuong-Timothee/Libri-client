import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorRoutingModule } from './author-routing.module';
import { AuthorListComponent } from './author-list.component';
import { UpdateAuthorComponent } from './update-author/update-author.component';
import { AddAuthorComponent } from './add-author/add-author.component';


@NgModule({
  declarations: [
    AuthorListComponent,
    UpdateAuthorComponent,
    AddAuthorComponent
  ],
  imports: [
    CommonModule,
    AuthorRoutingModule
  ]
})
export class AuthorModule { }
