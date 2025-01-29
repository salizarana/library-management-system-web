import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { UserService } from '../user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  @Output() saveSuccess: EventEmitter<any> = new EventEmitter<any>();
  formObject: any = {
    name: '',
    emailAddress: '',
    phone: '',
    userName: '',
    password: '',
  };
  constructor(
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public us: UserService
  ) {}

  ngOnInit(): void {
    if (this.data.mode.toLowerCase() == 'edit') {
      this.formObject = { ...this.data.data };
    }

    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      this.formObject.userPersonId = userData.res[0].userId;
    }
  }
  save() {
    console.log(this.formObject);
    this.us.setUser(this.formObject).subscribe((res) => {
      this.dialogRef.close(res);
      this.saveSuccess.emit(true);
      if (res) {
        console.log(res);
        console.log('received');
      }
    });
  }
}
