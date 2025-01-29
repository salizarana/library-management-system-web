import { Component, OnInit } from '@angular/core';
import { PaymentService } from './payment.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  constructor(public ps: PaymentService) {}
  displayedColumns: string[] = [
    'position',
    'paymentId',
    'username',
    'amount',
    'paymentType',
    'paymentDate',
  ];
  dataSource: any;

  selectedRowData: any;
  selectedIndex: any;

  userList: any;
  ngOnInit(): void {
    this.getPayment();
  }

  getPayment() {
    let json = {};
    this.ps.getPayment(json).subscribe((res) => {
      if (res) {
        this.userList = res;

        this.dataSource = this.userList[0].MergedPaymentIds;
        this.userList[0].MergedPaymentIds.sort((a: any, b: any) => {
          return b.paymentId - a.paymentId;
        });

        console.log('this.dataSource', this.dataSource[0].MergedPaymentIds);
      }
    });
  }

  selectedRowDetail(row: any, i: number) {
    this.selectedRowData = row;
    this.selectedIndex = i;
  }
}
