import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BookService } from '../book.service';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-book-issue',
  templateUrl: './book-issue.component.html',
  styleUrls: ['./book-issue.component.scss'],
})
export class BookIssueComponent implements OnInit {
  @Output() saveSuccess: EventEmitter<any> = new EventEmitter<any>();

  formObject: any = {
    userId: '',
    bookId: '',
    userPersonId: '',
    userName: '',
  };
  userControl = new FormControl();
  userList: { userId: string; userName: string; availableBorrow: number }[] =
    [];
  filteredUsers?: Observable<any[]>;
  saveDisabled: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<BookIssueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public bs: BookService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {
    console.log('Dialog Data:', data);
  }

  ngOnInit(): void {
    if (this.data && this.data.userList) {
      this.userList = this.data.userList;
    }
    console.log(this.userList);

    if (this.data.mode.toLowerCase() == 'issue') {
      this.formObject.bookId = this.data.bookId;
      console.log(this.data.bookId);
    }

    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      console.log('Parsed user data:', userData);

      if (userData.res && userData.res.length > 0) {
        this.formObject.userPersonId = userData.res[0].userId;
        console.log('User ID:', userData.res[0].userId);
      } else {
        console.error('User data or user ID is not available.');
      }
    }

    this.filteredUsers = this.userControl.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value.userName)),
      map((userName) =>
        userName ? this.filterUsers(userName) : this.userList.slice()
      )
    );
  }

  filterUsers(userName: string): { userId: string; userName: string }[] {
    const filterValue = userName.toLowerCase();
    return this.userList.filter((user) =>
      user.userName.toLowerCase().includes(filterValue)
    );
  }

  displayUserName(user: any): string {
    return user && user.userName ? user.userName : '';
  }

  onUserSelected(event: MatAutocompleteSelectedEvent): void {
    this.formObject.userId = event.option.value.userId;
    const selectedUser = event.option.value;
    if (selectedUser.availableBorrow === 0) {
      this.showSnackBar('Maximum borrow limit has been reached.');
      this.saveDisabled = true;
      console.log(this.saveDisabled);
    } else {
      this.saveDisabled = false;
    }

    this.cdr.detectChanges();
  }

  showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

  save() {
    if (this.saveDisabled) {
      return;
    }
    this.formObject.userId = this.formObject.userId;
    console.log(this.formObject);
    this.bs.setIssue(this.formObject).subscribe((res) => {
      this.dialogRef.close(res);
      this.saveSuccess.emit(true);

      if (res) {
        console.log(res);
        console.log('received');
        // this.dialogRef.close(res);
      }
    });
    this.snackBar.open('Book successfully issued', 'Close', {
      duration: 5000,
    });
  }
}
