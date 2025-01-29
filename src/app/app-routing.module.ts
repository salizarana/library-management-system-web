import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './layout/register/login/login.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthGuard } from './auth/auth.guard';
import { InvalidComponent } from './view/invalid/invalid.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'navigation',
    component: NavigationComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'user',
        loadChildren: () =>
          import('./view/user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'adduser',
        loadChildren: () =>
          import('./view/add-user/add-user.module').then(
            (m) => m.AddUserModule
          ),
      },
      {
        path: 'book',
        loadChildren: () =>
          import('./view/book/book.module').then((m) => m.BookModule),
      },
      {
        path: 'borrow',
        loadChildren: () =>
          import('./view/borrow/borrow.module').then((m) => m.BorrowModule),
      },
      {
        path: 'payment',
        loadChildren: () =>
          import('./view/payment/payment.module').then((m) => m.PaymentModule),
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./view/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
    ],
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [AuthGuard],
  },

  { path: '**', component: InvalidComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FontAwesomeModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
