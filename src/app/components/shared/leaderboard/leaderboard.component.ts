import { 
  Component, 
  OnInit, 
  OnDestroy,
  Input } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'ic-leaderboard',
  templateUrl: './leaderboard.component.html',
  styles: []
})
export class LeaderboardComponent implements OnInit, OnDestroy {

  @Input('for')
  submittedForId: string;
  leaders: any = [];
  socket: Subscription;  

  constructor(private authService: AuthService) { }

  ngOnInit() {
    if(this.submittedForId) {
      this.loadLeaders();
    }
    this.socket = this.authService.getSocketObservable(this.submittedForId).subscribe(() => {
      this.loadLeaders();
      console.log('yahh');
    });    
  }
  ngOnDestroy() {
    this.socket.unsubscribe();
  }

  loadLeaders() {
    this.authService.get(`leaderboards/${this.submittedForId}`, (response) => {
      if(!response.error) {
        this.leaders = [];        
        let leaders = response.msg;
        leaders.forEach((leader) => {
          this.leaders.push({ fullName: `${leader.userDetails[0].firstName} ${leader.userDetails[0].lastName}`, points: leader.points });
        });
      }
    }, false);
  }

}
