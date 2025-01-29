import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserFormComponent } from './user-form/user-form.component';
import { UserComponent } from './user.component';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { UserService } from './user.service';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [UserComponent, UserFormComponent, UserDetailComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    HttpClientModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    FormsModule,
    MatTableModule,
    MatTooltipModule,
  ],
  providers: [UserService],
})
export class UserModule {}
