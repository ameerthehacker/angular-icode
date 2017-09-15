import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Challenge } from "../../../models/challenge";
import { Router } from "@angular/router";

import { AuthService } from "../../../services/auth/auth.service";

@Component({
  selector: 'ic-challenge',
  templateUrl: './challenge.component.html'
})
export class ChallengeComponent implements OnInit {

  @Input()
  challenge: Challenge;
  @Output('delete')
  challengeDeleted: EventEmitter<string> = new EventEmitter<string>();

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }
  onBtnDeleteChallengeClick(evt) {
    evt.preventDefault();
    if(confirm("Are you sure to delete this challenge ?")) {
      this.authService.delete('challenges/' + this.challenge.slug, (response: any) => {
        if(!response.error) {
          this.challengeDeleted.emit(this.challenge.slug);
        }
        else {
          // TODO: Handle internal errors
        }
      });
    }
  }
}
