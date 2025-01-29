import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserDashboardService {
  apiUrl = 'https://localhost:44318/api/';

  constructor(public http: HttpClient) {}

  getUser(json: any): Observable<any> {
    const params = new HttpParams().set('json', JSON.stringify(json));
    return this.http.get(this.apiUrl + 'User/GetUserPage', { params });
  }

  setUser(json: any): Observable<any> {
    return this.http.post(this.apiUrl + 'User/UserPageTsk', {
      json: JSON.stringify(json),
    });
  }
}
