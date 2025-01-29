import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BorrowService } from '../borrow.service';
import { HttpClient } from '@angular/common/http';
import { InvoiceService } from './invoice.service';

@Component({
  selector: 'app-book-return',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent implements OnInit {
  @Output() saveSuccess: EventEmitter<any> = new EventEmitter<any>();
  selectedItem: any;
  charge: any;

  formObject: any = {
    borrowId: '',
    userId: '',
    bookId: '',
    returnedDate: '',
    returnDueDate: '',
    charge: '',
    userPersonId: '',
  };
  constructor(
    public dialogRef: MatDialogRef<InvoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public bs: BorrowService,
    public is: InvoiceService
  ) {}

  ngOnInit(): void {
    // this.formObject.returnedDate = new Date().toISOString();
    if (this.data.mode.toLowerCase() == 'add') {
      this.formObject.borrowId = this.data.borrowId;
      this.formObject.userId = this.data.userId;
      this.formObject.bookId = this.data.bookId;
      this.formObject.returnedDate = this.data.returnedDate;
      console.log(this.data.borrowId);
    }
    console.log(this.data.bookId);

    this.selectedItem = this.data.selectedItem;
    this.calculateCharge();

    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      console.log('Parsed user data:', userData);

      if (userData.res && userData.res.length > 0) {
        this.formObject.userPersonId = userData.res[0].userId;
        console.log('User ID:', userData.res[0].userId);
      }
    }
    console.log('abababa', this.formObject.charge);
  }

  calculateCharge() {
    const currentDate = new Date();

    // Format the date to match the required format
    const formattedDate = currentDate.toISOString().split('T')[0] + 'T00:00:00';
    this.is
      .setCharge({
        borrowId: this.data.borrowId,
        returnedDate: formattedDate,
        returnDueDate: this.data.returnDueDate,
      })
      .subscribe(
        (response) => {
          console.log('Server response:', response);
          this.charge = response[0].charge;
          console.log('Charge:', this.charge);
        },
        (error) => {
          console.error('Error calculating charge:', error);
        }
      );
  }

  save() {
    this.formObject.charge = this.charge;

    console.log(this.formObject);
    this.bs.setBorrow(this.formObject).subscribe((res) => {
      this.dialogRef.close(res);
      this.saveSuccess.emit(true);
      if (res) {
        console.log('kkkkk', res);
        console.log('received');
      }
    });
  }
  print() {
    window.print();
  }
}
