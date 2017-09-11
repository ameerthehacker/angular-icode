import { Component, OnInit, Input } from '@angular/core';
import { Challenge } from "../../../models/challenge";

@Component({
  selector: 'ic-challenge',
  templateUrl: './challenge.component.html'
})
export class ChallengeComponent implements OnInit {

  @Input()
  challenge: Challenge;

  constructor() { }

  ngOnInit() {
  }

}
