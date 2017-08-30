import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../services/auth/auth.service";

@Component({
  selector: 'ic-challenges-list',
  templateUrl: './challenges-list.component.html'
})
export class ChallengesListComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.get('challenges').subscribe();
  }
}
