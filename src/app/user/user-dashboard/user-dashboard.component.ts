import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDashboardService } from './user-dashboard.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
  constructor(private router: Router, public us: UserDashboardService) {}
  user: any;
  ngOnInit(): void {
    this.getCustomer();
  }

  getCustomer() {
    const userData = localStorage.getItem('user');
    if (userData) {
      const userId = JSON.parse(userData).res[0].userId;
      this.us.getUser(userId).subscribe((res: any) => {
        if (res) {
          console.log(res);
          const userList = res;
          this.user = userList.find((user: any) => user.userId === userId);
          console.log(this.user);
          // console.log(this.user.currentBorrowedList);
        }
      });
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }
}
