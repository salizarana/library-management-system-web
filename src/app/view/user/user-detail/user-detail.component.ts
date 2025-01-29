import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  userDetail: any;
  formObject: any = {
    userId: '',
    name: '',
    emailAddress: '',
    phone: '',
    userName: '',
    membershipType: '',
    startDate: '',
    endDate: '',
    totalBorrowed: '',
    currentBorrowedBooks: '',
    availableBorrow: '',
    returnedBooks: '',
    membershipDaysLeft: '',
    maxBorrow: '',
  };
  constructor(
    public dialogRef: MatDialogRef<UserDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public us: UserService
  ) {}

  ngOnInit(): void {
    if (this.data.mode.toLowerCase() == 'detail') {
      this.formObject = { ...this.data.data };
      console.log(this.formObject);
    }
  }
}
