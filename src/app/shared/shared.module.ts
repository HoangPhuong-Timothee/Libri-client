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
import { OrderTotalsComponent } from './order-totals/order-totals.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    NavbarComponent,
    PagingHeaderComponent,
    PagingFooterComponent,
    SectionHeaderComponent,
    TextInputComponent,
    NotFoundComponent,
    ServerErrorComponent,
    SidebarComponent,
    OrderTotalsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
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
    SidebarComponent,
    OrderTotalsComponent,
    MatIconModule,
    MatButtonModule
  ]
})
export class SharedModule { }
