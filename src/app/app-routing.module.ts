import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { IntroductionComponent } from './features/introduction/introduction.component';
import { TestErrorComponent } from './features/test-error/test-error.component';
import { ServerErrorComponent } from './shared/server-error/server-error.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { breadcrumb: 'Home' },
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
    path: 'introduction',
    component: IntroductionComponent,
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
