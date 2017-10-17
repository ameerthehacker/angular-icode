import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class AppService {

  server = environment.backend.server;  

  constructor() { }

  public getUrl(uri){
    return `${this.server}/${uri}`;
  }

}
