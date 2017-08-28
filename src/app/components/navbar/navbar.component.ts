import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AuthService } from "../../services/auth/auth.service";

@Component({
  selector: 'ic-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onLogoutClick($event) {
    $event.preventDefault();
    this.authService.destroySession();
    this.router.navigate(['/auth/login']);
  }

}
