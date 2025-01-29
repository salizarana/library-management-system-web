import { Component, OnInit } from '@angular/core';
import { BookService } from './book.service';
import { MatDialog } from '@angular/material/dialog';
import { BookFormComponent } from './book-form/book-form.component';
import { BookIssueComponent } from './book-issue/book-issue.component';
import { BookEditComponent } from './book-edit/book-edit.component';
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {
  constructor(public bs: BookService, public dialog: MatDialog) {}
  displayedColumns: string[] = [
    'position',
    'bookId',
    'title',
    'author',
    'genre',
    'quantity',
    'availableQuantity',
    'action',
  ];
  dataSource: any;

  selectedRowData: any;
  selectedIndex: any;

  bookList: any;
  userList: any;
  ngOnInit(): void {
    this.getBook();
    this.getUser();
  }

  add() {
    const dialogRef = this.dialog.open(BookFormComponent, {
      data: { data: 'xyz', mode: 'Add' },
      disableClose: true,
    });

    dialogRef.componentInstance.saveSuccess.subscribe(() => {
      this.getBook();
    });
  }

  edit(row: any) {
    const dialogRef = this.dialog.open(BookEditComponent, {
      data: {
        data: row,
        mode: 'Edit',
      },
    });

    // dialogRef.afterClosed().subscribe((res) => {
    //   if (res) {
    //     this.getBook();
    //   }
    // });
    dialogRef.componentInstance.saveSuccess.subscribe(() => {
      this.getBook();
    });
  }

  issue(bookId: number) {
    console.log('User List:', this.userList);
    const dialogRef = this.dialog.open(BookIssueComponent, {
      data: {
        data: 'xyz',
        mode: 'Issue',
        bookId: bookId,
        userList: this.userList,
      },
      disableClose: false,
    });
    dialogRef.componentInstance.saveSuccess.subscribe(() => {
      this.getBook();
    });
  }

  getBook() {
    let json = {};
    this.bs.getBook(json).subscribe((res) => {
      if (res) {
        this.bookList = res;

        this.dataSource = res;
      }
    });
  }

  getUser() {
    let json = {};
    this.bs.getUser(json).subscribe((res) => {
      if (res) {
        this.userList = res;
      }
    });
  }
}
