import { Component, OnInit } from '@angular/core';

import { AuthService } from "../../services/auth/auth.service";

@Component({
  selector: 'ic-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onLogoutClick($event) {
    $event.preventDefault();
    this.authService.destroySession();
  }

}
