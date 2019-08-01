import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', `${username + ':' + password}`);
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');


    return this.http.post<any>(`${environment.apiUrl}/authenticate`, null, {headers: headers})
      .pipe(map(user => {
          localStorage.setItem('currentUser', JSON.stringify(user));
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
