import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../user/user.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { AddUserService } from './add-user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatStepper } from '@angular/material/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';

interface Membership {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper;
  formObject: any = {
    name: '',
    emailAddress: '',
    phone: '',
    userName: '',
    password: '',
    membershipType: '',
    userPersonId: '',
  };
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  memberships: Membership[] = [
    { value: 3, viewValue: 'Premium' },
    { value: 4, viewValue: 'Standard' },
  ];
  selectedMembershipType: number | null = null;
  selectedMembershipData: any | null = null;
  userList: any;
  isUsernameUnique: boolean = true;
  isLinear = false;

  constructor(
    public us: AddUserService,
    private _formBuilder: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  onSelectMembershipType(type: number): void {
    this.selectedMembershipType = type;
    if (type === 3 || type === 4) {
      this.fetchMembershipData(type);
    }
  }

  fetchMembershipData(type: number): void {
    const json = { membershipType: type };
    this.us.getMembership(json).subscribe((data: any[]) => {
      // Filter data based on the selected membership type
      this.selectedMembershipData = data.find(
        (item) => item.membershipType === type
      );
    });
  }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^(98|97)\d{8}$/)]],
      userName: ['', Validators.required],
      password: [
        '',
        [Validators.required, Validators.pattern(/^(?=.*\d).{6,}$/)],
      ],
      // userPersonId: ['', Validators.required],
    });

    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });

    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      console.log('Parsed user data:', userData);

      if (userData.res && userData.res.length > 0) {
        this.formObject.userPersonId = userData.res[0].userId;
        console.log('User ID:', userData.res[0].userId);
        console.log(this.formObject.userPersonId);
      } else {
        console.error('User data or user ID is not available.');
      }
    }

    this.firstFormGroup
      .get('userName')
      ?.valueChanges.pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value: string) => {
        if (value) {
          const isUnique = !this.userList.some(
            (user: any) => user.userName === value
          );
          if (isUnique) {
            this.firstFormGroup.get('userName')?.setErrors(null);
          } else {
            this.firstFormGroup.get('userName')?.setErrors({ notUnique: true });
          }
        }
      });
    this.getUser();
  }

  // reset(): void {
  //   this.firstFormGroup.reset();

  //   Object.keys(this.firstFormGroup.controls).forEach((controlName) => {
  //     this.firstFormGroup.get(controlName)?.setErrors(null);
  //   });
  // }

  getUser() {
    let json = {};
    this.us.getUser(json).subscribe((res) => {
      if (res) {
        this.userList = res;
      }
    });
  }

  public trackByMembership(index: number, item: Membership) {
    return item.value;
  }

  save() {
    const userData = {
      name: this.firstFormGroup.get('name')?.value,
      emailAddress: this.firstFormGroup.get('emailAddress')?.value,
      phone: this.firstFormGroup.get('phone')?.value,
      userName: this.firstFormGroup.get('userName')?.value,
      password: this.firstFormGroup.get('password')?.value,
      membershipType: this.secondFormGroup.get('secondCtrl')?.value,
      userPersonId: this.formObject.userPersonId,
    };
    console.log(userData);

    this.us.setUser(userData).subscribe((res) => {
      this.router.navigate(['/navigation/user']);
      if (res) {
        console.log(res);
        console.log('received');
      }
    });

    this.snackBar.open('User successfully added', 'Close', {
      duration: 5000,
    });
  }
}
