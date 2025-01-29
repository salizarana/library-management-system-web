import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { BookFormComponent } from './book-form/book-form.component';
import { BookComponent } from './book.component';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { BookService } from './book.service';
import { BookIssueComponent } from './book-issue/book-issue.component';
import { MatSelectModule } from '@angular/material/select';
import { BookEditComponent } from './book-edit/book-edit.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    BookComponent,
    BookFormComponent,
    BookIssueComponent,
    BookEditComponent,
  ],
  imports: [
    CommonModule,
    BookRoutingModule,
    HttpClientModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    FormsModule,
    MatTableModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatButtonModule,
  ],
  providers: [BookService],
})
export class BookModule {}
