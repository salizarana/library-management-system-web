import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  apiUrl = 'https://localhost:44318/api/';

  constructor(public http: HttpClient) {}

  setCharge(json: any): Observable<any> {
    return this.http.post(this.apiUrl + 'Common/CalculateBorrowTsk', {
      json: JSON.stringify(json),
    });
  }
}
