import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { PagingHeaderComponent } from './paging-header/paging-header.component';
import { PagingFooterComponent } from './paging-footer/paging-footer.component';
import { SectionHeaderComponent } from './section-header/section-header.component';
import { RouterModule } from '@angular/router';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TextInputComponent } from './text-input/text-input.component';
import { BreadcrumbModule } from 'xng-breadcrumb';



@NgModule({
  declarations: [
    NavbarComponent,
    PagingHeaderComponent,
    PagingFooterComponent,
    SectionHeaderComponent,
    TextInputComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
    BreadcrumbModule
  ],
  exports: [
    NavbarComponent,
    PagingHeaderComponent,
    PagingFooterComponent,
    ReactiveFormsModule,
    BsDropdownModule,
    TextInputComponent,
    SectionHeaderComponent,
    BreadcrumbModule
  ]
})
export class SharedModule { }
