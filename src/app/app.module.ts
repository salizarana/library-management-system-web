import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterModule } from './layout/register/register.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { NavigationModule } from './layout/navigation/navigation.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserComponent } from './view/user/user.component';
import { BookComponent } from './view/book/book.component';
import { AddUserComponent } from './view/add-user/add-user.component';
import { BorrowComponent } from './view/borrow/borrow.component';
import { PaymentComponent } from './view/payment/payment.component';
import { InvalidComponent } from './view/invalid/invalid.component';
import { DashboardComponent } from './view/dashboard/dashboard.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [AppComponent, InvalidComponent, UserDashboardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RegisterModule,
    BrowserAnimationsModule,
    NavigationModule,
    FontAwesomeModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSortModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
