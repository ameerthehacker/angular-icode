import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../services/auth/auth.service";
import { Challenge } from "../../../models/challenge";

@Component({
  selector: 'ic-challenges-list',
  templateUrl: './challenges-list.component.html'
})
export class ChallengesListComponent implements OnInit {

  challenges: Challenge[];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.get('challenges', (response: any) => {
      if(!response.error) {
        this.challenges = response.msg;
      }
      else {
        // TODO: Show internal error message
      }
    });
  }

  onChallengeDelete(slug) {
    this.challenges.forEach((challenge, index) => {
      if(challenge.slug == slug) {
        this.challenges.splice(index, 1);
        return;
      }
    });
  }
}
