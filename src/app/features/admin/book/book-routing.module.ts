import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditBookComponent } from './edit-book/edit-book.component';
import { AddBookComponent } from './add-book/add-book.component';

const routes: Routes = [
  {
    path: 'edit/:id',
    component: EditBookComponent,
    data: { breadcrumb: 'Edit book' }
  },
  {
    path: 'add',
    component: AddBookComponent,
    data: { breadcrumb: 'Create book' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
