import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddUserService {
  apiUrl = 'https://localhost:44318/api/';

  constructor(public http: HttpClient) {}

  setUser(json: any): Observable<any> {
    return this.http.post(this.apiUrl + 'User/UserCustomerTsk', {
      json: JSON.stringify(json),
    });
  }

  getUser(json: any): Observable<any> {
    const params = new HttpParams().set('json', JSON.stringify(json));
    return this.http.get(this.apiUrl + 'User/GetUser', { params });
  }

  getMembership(json: any): Observable<any> {
    const params = new HttpParams().set('json', JSON.stringify(json));
    return this.http.get(this.apiUrl + 'Membership/GetMembership', { params });
  }
}
