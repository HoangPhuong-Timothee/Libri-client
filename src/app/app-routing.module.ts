import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { IntroductionComponent } from './features/introduction/introduction.component';
import { TestErrorComponent } from './features/test-error/test-error.component';
import { ServerErrorComponent } from './shared/components/server-error/server-error.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { breadcrumb: 'Trang chủ' },
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard, AdminGuard],
    data: { breadcrumb: { skip: true } }
  },
  {
    path: 'bookcase', 
    loadChildren: () => import('./features/book/book.module').then(m => m.BookModule) 
  },
  {
    path: '',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'wishlist',
    loadChildren: () => import('./features/wishlist/wishlist.module').then(m => m.WishlistModule)
  },
  {
    path: 'basket',
    loadChildren: () => import('./features/basket/basket.module').then(m => m.BasketModule),
    data: { breadcrumb: 'Giỏ sách' }
  },
  {
    path: 'checkout',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/checkout/checkout.module').then(m => m.CheckoutModule),
    data: { breadcrumb: 'Thanh toán' }
  },
  {
    path: 'order',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/order/order.module').then(m => m.OrderModule),
    data: { breadcrumb: 'Đơn đặt sách' }
  },
  {
    path: 'introduction',
    component: IntroductionComponent,
    data: { breadcrumb: 'Giới thiệu' }
  },
  {
    path: 'test-error',
    component: TestErrorComponent
  },
  {
    path: 'server-error',
    component: ServerErrorComponent
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
