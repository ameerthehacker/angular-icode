import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/Rx';

import { AppService } from "../app/app.service";

@Injectable()
export class AuthService {

  constructor(private http:Http, private app:AppService) { }

  authenticate(username: string, password: string) {
    let body = { username: username, password: password };
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.app.getUrl('auth/login'), body).map((response: Response) => response.json(), {
      'headers': headers
    });
  }
  createSession(user) {
    localStorage.setItem('user', user);
  }
  destroySession(user) { 
    localStorage.clear();
  }

}
