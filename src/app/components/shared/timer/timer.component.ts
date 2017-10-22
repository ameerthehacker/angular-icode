import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { TimerService } from "../../../services/timer/timer.service";

@Component({
  selector: 'ic-timer',
  templateUrl: './timer.component.html',
  styles: []
})
export class TimerComponent implements OnInit {

  timeRemaining: number;
  timeString: string;

  constructor(private timerService: TimerService) { }

  ngOnInit() {
    let timerObservable = this.timerService.getTimer().subscribe((timeRemaining) => {
      this.timeRemaining = timeRemaining;
      if(timeRemaining == 0) {
        timerObservable.unsubscribe();
        this.timerService.timerEnded.emit();
      }
    });
  }

  private getFormattedTimeString(x: number): string {
    let formattedString = x.toString();
    if(x < 10) {
      formattedString = `0${x}`;
    }

    return formattedString;
  }
  getTimeString() {
    let timeRemaining = this.timeRemaining;
    let hoursRemaining = this.getFormattedTimeString(Math.floor(timeRemaining / 3600));
    timeRemaining = timeRemaining % 3600;
    let minutesRemaining = this.getFormattedTimeString(Math.floor(timeRemaining / 60));
    let secondsRemaining = this.getFormattedTimeString((timeRemaining % 60));
    
    return `${hoursRemaining}:${minutesRemaining}:${secondsRemaining}`;
  }

}
