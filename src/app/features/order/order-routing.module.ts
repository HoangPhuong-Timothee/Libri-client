import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderComponent } from './order.component';

const routes: Routes = [
  {
    path: '',
    component: OrderComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':id',
    component: OrderDetailsComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: { alias: 'orderDetails' } }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
