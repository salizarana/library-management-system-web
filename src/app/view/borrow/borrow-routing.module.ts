import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BorrowComponent } from './borrow.component';
import { AuthGuard } from 'src/app/auth/auth.guard';

const routes: Routes = [
  { path: '', component: BorrowComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BorrowRoutingModule {}
