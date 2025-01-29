import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BorrowService {
  apiUrl = 'https://localhost:44318/api/';

  constructor(public http: HttpClient) {}

  getBorrow(json: any): Observable<any> {
    const params = new HttpParams().set('json', JSON.stringify(json));
    return this.http.get(this.apiUrl + 'Borrow/GetBorrow', { params });
  }

  setBorrow(json: any): Observable<any> {
    return this.http.post(this.apiUrl + 'Borrow/BorrowTsk', {
      json: JSON.stringify(json),
    });
  }
}
