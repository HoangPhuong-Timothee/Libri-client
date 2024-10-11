import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PagingFooterComponent } from './components/paging-footer/paging-footer.component';
import { SectionHeaderComponent } from './components/section-header/section-header.component';
import { RouterModule } from '@angular/router';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ServerErrorComponent } from './components/server-error/server-error.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { OrderTotalsComponent } from './components/order-totals/order-totals.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InputTextComponent } from './components/input-text/input-text.component';
import { CustomCurrencyPipe } from './pipes/custom-currency.pipe';
import { TruncateTitlePipe } from './pipes/truncate-title.pipe';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { BookItemComponent } from './components/book-item/book-item.component';
import { BasketItemComponent } from './components/basket-item/basket-item.component';
import { CustomTableComponent } from './components/custom-table/custom-table.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { StepperComponent } from './components/stepper/stepper.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
 
@NgModule({
  declarations: [
    NavbarComponent,
    PagingHeaderComponent,
    PagingFooterComponent,
    SectionHeaderComponent,
    NotFoundComponent,
    ServerErrorComponent,
    OrderTotalsComponent,
    InputTextComponent,
    CustomCurrencyPipe,
    TruncateTitlePipe,
    BookItemComponent,
    BasketItemComponent,
    CustomTableComponent,
    StepperComponent,
    ConfirmationDialogComponent
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
    FormsModule,
    BreadcrumbModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatPaginatorModule,
    MatTooltipModule,
    CdkStepperModule,
    MatTabsModule,
    MatDialogModule,
    MatSelectModule
  ],
  exports: [
    NavbarComponent,
    PagingHeaderComponent,
    PagingFooterComponent,
    ReactiveFormsModule,
    BsDropdownModule,
    SectionHeaderComponent,
    BreadcrumbModule,
    NgxSpinnerModule,
    ToastrModule,
    OrderTotalsComponent,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    InputTextComponent,
    FormsModule,
    CustomCurrencyPipe,
    TruncateTitlePipe,
    MatCheckboxModule,
    MatRadioModule,
    BasketItemComponent,
    BookItemComponent,
    MatTooltipModule,
    MatPaginatorModule,
    CustomTableComponent,
    CdkStepperModule,
    StepperComponent,
    MatTabsModule,
    MatDialogModule,
    MatSelectModule,
    ConfirmationDialogComponent
  ]
})
export class SharedModule { }
