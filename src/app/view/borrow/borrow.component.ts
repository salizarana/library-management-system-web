import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BorrowService } from './borrow.service';
import { MatDialog } from '@angular/material/dialog';
import { InvoiceComponent } from './invoice/invoice.component';
import { MatPaginator } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.component.html',
  styleUrls: ['./borrow.component.scss'],
})
export class BorrowComponent implements OnInit, AfterViewInit {
  constructor(
    public bs: BorrowService,
    public dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer
  ) {}
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue =
      (event.target as HTMLInputElement)?.value?.trim().toLowerCase() || '';
    this.dataSource.filter = filterValue;
  }

  displayedColumns: string[] = [
    'borrowId',
    'name',
    'title',
    'borrowedDate',
    'returnDueDate',
    'returnedDate',
    'charge',
    'paymentId',
    'action',
  ];

  dataSource: any;
  selectedRowData: any;
  selectedIndex: any;

  borrowList: any;

  ngOnInit(): void {
    this.getBorrow();
  }

  return(
    borrowId: number,
    userId: number,
    bookId: number,
    returnDueDate: string
  ) {
    const selectedItem: any | undefined = this.borrowList.find(
      (item: any) => item.borrowId === borrowId
    );
    if (selectedItem) {
      const returnedDate = new Date();
      const dialogRef = this.dialog.open(InvoiceComponent, {
        data: {
          mode: 'add',
          borrowId: borrowId,
          userId: userId,
          bookId: bookId,
          returnDueDate: returnDueDate,
          returnedDate: returnedDate,
          selectedItem: selectedItem,
        },
        disableClose: true,
      });

      dialogRef.componentInstance.saveSuccess.subscribe(() => {
        this.getBorrow();
      });
    }
  }

  getBorrow() {
    let json = {};
    this.bs.getBorrow(json).subscribe((res) => {
      if (res) {
        this.borrowList = res;
        // Sort the data by borrowId in descending order
        this.dataSource = res.sort((a: any, b: any) => {
          return b.borrowId - a.borrowId;
        });
      }
    });
  }

  selectedRowDetail(row: any, i: number) {
    this.selectedRowData = row;
    this.selectedIndex = i;
  }
}
