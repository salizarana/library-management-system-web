import {
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserFormComponent } from '../../user/user-form/user-form.component';
import { BookService } from '../book.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookFormComponent } from '../book-form/book-form.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss'],
})
export class BookEditComponent implements OnInit {
  @Output() saveSuccess: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('bookForm') bookForm!: NgForm;
  formObject: any = {
    bookId: '',
    title: '',
    author: '',
    genre: '',
    quantity: '',
    availableQuantity: '',
    userPersonId: '',
  };
  constructor(
    public dialogRef: MatDialogRef<BookEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public bs: BookService,
    private snackBar: MatSnackBar
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
    this.bs.setBook(this.formObject).subscribe((res) => {
      this.dialogRef.close(res);
      this.saveSuccess.emit(true);
      if (res) {
        console.log(res);
        console.log('received');
      }
    });

    this.snackBar.open('Book successfully edited', 'Close', {
      duration: 5000,
    });
  }
}
