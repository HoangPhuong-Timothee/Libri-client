import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookcaseComponent } from './bookcase.component';
import { BookDetailsComponent } from './book-details/book-details.component';

const routes: Routes = [
  {
    path: '',
    component: BookcaseComponent
  },
  {
    path: ':id',
    component: BookDetailsComponent,
    data: { breadcrumb: { alias: 'bookDetails' } }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
