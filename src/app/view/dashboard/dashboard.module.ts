import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MatCardModule } from '@angular/material/card';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './dashboard.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatCardModule,
    HttpClientModule,
  ],
  providers: [DashboardService],
})
export class DashboardModule {}
