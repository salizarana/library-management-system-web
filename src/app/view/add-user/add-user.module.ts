import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddUserRoutingModule } from './add-user-routing.module';
import { MatStepperModule } from '@angular/material/stepper';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AddUserComponent } from './add-user.component';
import { MatSelectModule } from '@angular/material/select';
import { AddUserService } from './add-user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
@NgModule({
  declarations: [AddUserComponent],
  imports: [
    CommonModule,
    AddUserRoutingModule,
    MatButtonModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatSnackBarModule,
  ],
  providers: [AddUserService],
})
export class AddUserModule {}
