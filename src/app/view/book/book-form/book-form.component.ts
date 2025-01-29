import {
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BookService } from '../book.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  NgForm,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
})
export class BookFormComponent implements OnInit {
  @Output() saveSuccess: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('bookForm') bookForm!: NgForm;
  formObject: any = {
    userPersonId: '',
  };
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<BookFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public bs: BookService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      genre: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      availableQuantity: ['', [Validators.required, Validators.min(0)]],
      userPersonId: [''],
    });

    this.form.get('quantity')?.valueChanges.subscribe(() => {
      this.updateAvailableQuantityValidity();
    });

    this.form.get('availableQuantity')?.valueChanges.subscribe(() => {
      this.updateAvailableQuantityValidity();
    });
  }

  ngOnInit(): void {
    if (this.data.mode.toLowerCase() == 'edit') {
      this.form.patchValue(this.data.data);
    }

    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      const userData = JSON.parse(userDataString);

      if (userData.res && userData.res.length > 0) {
        this.formObject.userPersonId = userData.res[0].userId;
      }
    }
  }

  updateAvailableQuantityValidity() {
    const quantity = this.form.get('quantity')?.value;
    const availableQuantity = this.form.get('availableQuantity')?.value;

    if (availableQuantity > quantity) {
      this.form.get('availableQuantity')?.setErrors({ invalidQuantity: true });
    } else {
      this.form.get('availableQuantity')?.setErrors(null);
    }
  }

  save() {
    if (this.form.valid) {
      const formValue = {
        ...this.form.value,
        userPersonId: this.formObject.userPersonId,
      };
      console.log(formValue);

      this.bs.setBook(formValue).subscribe((res) => {
        this.dialogRef.close(res);
        this.saveSuccess.emit(true);
        this.snackBar.open('Book successfully added', 'Close', {
          duration: 5000,
        });
      });
    }
  }
}
