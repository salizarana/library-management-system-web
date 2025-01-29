import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDashboardRoutingModule } from './user-dashboard-routing.module';
import { UserDashboardComponent } from './user-dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { UserDashboardService } from './user-dashboard.service';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserDashboardRoutingModule,
    HttpClientModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatTabsModule,
  ],
  providers: [UserDashboardService],
})
export class UserDashboardModule {}
