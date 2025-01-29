import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  apiUrl = 'https://localhost:44318/api/';

  constructor(public http: HttpClient) {}

  getNavigation(json: any): Observable<any> {
    const params = new HttpParams().set('json', JSON.stringify(json));
    return this.http.get(this.apiUrl + 'Common/GetNavigation', { params });
  }
}
