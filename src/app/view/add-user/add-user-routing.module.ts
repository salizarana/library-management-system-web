import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user.component';
import { AuthGuard } from 'src/app/auth/auth.guard';

const routes: Routes = [
  { path: '', component: AddUserComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddUserRoutingModule {}
