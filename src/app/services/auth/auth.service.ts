import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import { JwtHelper } from "angular2-jwt";
import { Router } from "@angular/router";
import { Observable,  } from 'rxjs/Rx';
import 'rxjs/Rx';

import { AppService } from "../app/app.service";

@Injectable()
export class AuthService {

  constructor(private http: Http, private app: AppService, private jwtHelper: JwtHelper, private router: Router) { }

  get(uri: string): Observable<any> {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(this.app.getUrl(uri), { headers: headers })
    .map((response: Response) => response.json())
    .catch((err: any) => {
      console.log(err);
      if(err.status == 401) {
        this.router.navigate(['/auth/login']);
      }
      return Observable.throw(err);
    });
  }
  authenticate(username: string, password: string) {
    let body = { username: username, password: password };
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.app.getUrl('auth/login'), body)
    .map((response: Response) => response.json(), {
      'headers': headers
    });
  }
  createSession(response) {
    localStorage.setItem('user', JSON.stringify(response.user));
    localStorage.setItem('token', response.token);    
  }
  destroySession() { 
    localStorage.clear();
  }
  isLoggedIn() {
    let token = localStorage.getItem('token');
    if(token) {
      if(this.jwtHelper.isTokenExpired(token)) {
        return false;
      }
      else {
        return true;
      }
    }
    else {
      return false;
    }
  }

}
