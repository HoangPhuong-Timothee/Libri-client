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
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    NavbarComponent,
    PagingHeaderComponent,
    PagingFooterComponent,
    SectionHeaderComponent,
    TextInputComponent,
    NotFoundComponent,
    ServerErrorComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot(),
    NgxSpinnerModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }),
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
    BreadcrumbModule,
    NgxSpinnerModule,
    ToastrModule,
    SidebarComponent
  ]
})
export class SharedModule { }
