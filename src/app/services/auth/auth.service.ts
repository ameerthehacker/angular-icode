import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import { JwtHelper } from "angular2-jwt";
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

import { AppService } from "../app/app.service";
import { FlashMessageService } from "../flash-message/flash-message.service";
import { ShowProgressService } from "../show-progress/show-progress.service";


@Injectable()
export class AuthService {

  constructor(private http: Http, private app: AppService, private jwtHelper: JwtHelper, private router: Router, private flashMessageService: FlashMessageService, private showProgressService: ShowProgressService) { }

  private interceptRequest(observable: Observable<any>, callback): Observable<any> {
    // Show load progress
    this.showProgressService.showProgress("Processing...");
    // Make the return data as json and catch error if any
    observable.map((response: Response) => response.json())
    .catch((err: any) => {
      if(err.status == 401) {
        this.flashMessageService.addFlashMessage(['Please login again!'], 'negative');
        this.router.navigate(['/auth/login']);
      }
      return Observable.throw(err);
    })
    .subscribe(callback, null, () => {
      this.showProgressService.hideProgress();
    });
    // return the modifies observable
    return observable;
  }
  get(uri: string, callback): Observable<any> {
    let headers = new Headers();    
    // Set authorization headers
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    headers.append('Content-Type', 'application/json');    
    let observable: Observable<any> = this.http.get(this.app.getUrl(uri), { headers: headers });
    return this.interceptRequest(observable, callback);
  }
  post(uri: string, body: Object, callback): Observable<any> {
    let headers = new Headers();    
    // Set authorization headers
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    headers.append('Content-Type', 'application/json');    
    let observable: Observable<any> = this.http.post(this.app.getUrl(uri), body, { headers: headers });
    return this.interceptRequest(observable, callback);
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
