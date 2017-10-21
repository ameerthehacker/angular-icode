import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Challenge } from "../../../models/challenge";
import { Router } from "@angular/router";

import { AuthService } from "../../../services/auth/auth.service";
import { ModalService } from "../../../services/modal/modal.service";

@Component({
  selector: 'ic-challenge',
  templateUrl: './challenge.component.html'
})
export class ChallengeComponent implements OnInit {

  @Input()
  challenge: Challenge;
  @Output('delete')
  challengeDeleted: EventEmitter<string> = new EventEmitter<string>();
  userIsOwner: boolean;

  constructor(private authService: AuthService, private router: Router, private modalService: ModalService) { }

  ngOnInit() {
    if(this.challenge.userId == this.authService.getCurrentUserId()) {
      this.userIsOwner = true;
    }
    else {
      this.userIsOwner = false;
    }
  }
  onBtnDeleteChallengeClick(evt) {
    evt.preventDefault();
    if(confirm("Are you sure to delete this challenge ?")) {
      this.authService.delete('challenges/' + this.challenge.slug, (response: any) => {
        if(!response.error) {
          this.challengeDeleted.emit(this.challenge.slug);
        }
        else {
          this.modalService.showModal('OOPS!', 'The challenge could not be deleted');
        }
      });
    }
  }
}
