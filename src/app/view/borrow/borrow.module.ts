import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BorrowRoutingModule } from './borrow-routing.module';
import { BorrowComponent } from './borrow.component';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { BorrowService } from './borrow.service';
import { MatDialogModule } from '@angular/material/dialog';
import { InvoiceComponent } from './invoice/invoice.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
@NgModule({
  declarations: [BorrowComponent, InvoiceComponent],
  imports: [
    CommonModule,
    BorrowRoutingModule,
    HttpClientModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    FormsModule,
    MatTableModule,
    MatDatepickerModule,
    MatPaginatorModule,
  ],
  providers: [BorrowService],
})
export class BorrowModule {}
