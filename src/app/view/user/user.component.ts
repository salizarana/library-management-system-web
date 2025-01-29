import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from './user-form/user-form.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  constructor(public us: UserService, public dialog: MatDialog) {}
  displayedColumns: string[] = [
    'position',
    'userId',
    'name',
    'userName',
    'membershipType',
    'membershipDaysLeft',
    'currentBorrowedBooks',
    'availableBorrow',
    'action',
  ];
  dataSource: any;

  selectedRowData: any;
  selectedIndex: any;

  userList: any;
  ngOnInit(): void {
    this.getUser();
  }

  edit(row: any) {
    const dialogRef = this.dialog.open(UserFormComponent, {
      data: {
        data: row,
        mode: 'Edit',
      },
    });
    // dialogRef.afterClosed().subscribe((res) => {
    //   if (res) {
    //     this.getUser();
    //   }
    // });

    dialogRef.componentInstance.saveSuccess.subscribe(() => {
      this.getUser();
    });
  }

  view(row: any) {
    const dialogRef = this.dialog.open(UserDetailComponent, {
      data: {
        data: row,
        mode: 'Detail',
      },
    });
  }

  getUser() {
    let json = {};
    this.us.getUser(json).subscribe((res) => {
      if (res) {
        this.userList = res;
        this.dataSource = res.sort((a: any, b: any) => {
          return b.userId - a.userId;
        });
        console.log(this.dataSource);
      }
    });
  }

  selectedRowDetail(row: any, i: number) {
    this.selectedRowData = row;
    this.selectedIndex = i;
  }
}
