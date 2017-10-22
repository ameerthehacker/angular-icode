import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";
import "rxjs/Rx";

import { EventEmitter } from "@angular/core";

@Injectable()
export class TimerService {

  time: number;
  timer: Observable<number>;
  timerStarted: EventEmitter<number> = new EventEmitter<number>();
  timerEnded: EventEmitter<any> = new EventEmitter<any>();  

  constructor() { }

  startTimer(time: number) {
    this.time = time;
    this.timerStarted.emit(time);    
  }
  getTimer(): Observable<number> {
    return Observable.timer(0, 1000).map((tick) => this.time - tick);
  }

}
