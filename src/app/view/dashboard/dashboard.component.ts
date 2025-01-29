import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from './dashboard.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router, public ds: DashboardService) {}
  public chart: any;
  dashboardList: any;
  ngOnInit(): void {
    this.setDashboard();
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }

  pieChartData: any = [
    {
      data: [],
    },
  ];

  setDashboard() {
    let json = {};
    this.ds.setDashboard(json).subscribe((res) => {
      if (res) {
        this.dashboardList = res;
        console.log(this.dashboardList);
      }
    });
  }
}
