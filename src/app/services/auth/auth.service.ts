import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import { JwtHelper } from "angular2-jwt";
import 'rxjs/Rx';

import { AppService } from "../app/app.service";

@Injectable()
export class AuthService {

  constructor(private http: Http, private app: AppService, private jwtHelper: JwtHelper) { }

  authenticate(username: string, password: string) {
    let body = { username: username, password: password };
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.app.getUrl('auth/login'), body).map((response: Response) => response.json(), {
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
