import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SHA256 } from 'crypto-js';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    public rs: RegisterService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {}
  hide: boolean = true;
  adminList: any;
  userList: any;
  formObject: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.getAdmin();
    this.initForm();
    this.getUser();
  }

  initForm() {
    this.formObject = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  save() {
    if (this.formObject.valid) {
      const userName = this.formObject.get('userName')?.value.toLowerCase();
      const password = this.formObject.get('password')?.value;

      //const hashedPassword = SHA256(password).toString();

      const user = this.adminList.find(
        (user: any) =>
          user.userName === userName &&
          user.password === password &&
          user.userType === 'admin'
      );
      const customer = this.userList.find(
        (customer: any) =>
          customer.userName === userName &&
          customer.password === password &&
          customer.userType === 'user'
      );
      if (user) {
        let userData = {
          res: [{ userId: user.userId, userType: user.userType }],
        };
        localStorage.setItem('user', JSON.stringify(userData));
        this.router.navigate(['navigation', 'dashboard']);
      } else if (customer) {
        let customerData = {
          res: [{ userId: customer.userId, userType: customer.userType }],
        };
        localStorage.setItem('user', JSON.stringify(customerData));
        this.router.navigate(['user-dashboard']);
      } else {
        this.invalidLogin();
      }
    }
  }

  invalidLogin() {
    const snackBarRef: MatSnackBarRef<any> = this.snackBar.open(
      'Invalid username or password',
      'Close',
      { duration: 2000, panelClass: ['snackbar'] }
    );

    // snackBarRef.afterDismissed().subscribe(() => {
    //   window.location.reload();
    // });
  }

  togglePasswordVisibility(event: Event): void {
    event.preventDefault(); // Prevent default form submission behavior
    this.hide = !this.hide;
  }

  getAdmin() {
    let json = {};
    this.rs.getAdmin(json).subscribe((res) => {
      if (res) {
        this.adminList = res;
      }
    });
  }

  getUser() {
    let json = {};
    this.rs.getUser(json).subscribe((res) => {
      if (res) {
        this.userList = res;
      }
    });
  }
}
