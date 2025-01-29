import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  apiUrl = 'https://localhost:44318/api/';

  constructor(public http: HttpClient) {}

  getBook(json: any): Observable<any> {
    const params = new HttpParams().set('json', JSON.stringify(json));
    return this.http.get(this.apiUrl + 'Book/GetBook', { params });
  }

  setBook(json: any): Observable<any> {
    return this.http.post(this.apiUrl + 'Book/BookTsk', {
      json: JSON.stringify(json),
    });
  }

  setIssue(json: any): Observable<any> {
    return this.http.post(this.apiUrl + 'Borrow/BorrowTsk', {
      json: JSON.stringify(json),
    });
  }

  getUser(json: any): Observable<any> {
    const params = new HttpParams().set('json', JSON.stringify(json));
    return this.http.get(this.apiUrl + 'User/GetUser', { params });
  }
}
