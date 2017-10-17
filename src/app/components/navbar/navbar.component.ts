import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AuthService } from "../../services/auth/auth.service";
import { FlashMessageService } from "../../services/flash-message/flash-message.service";

declare var $:any;

@Component({
  selector: 'ic-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  
  constructor(private authService: AuthService, private router: Router, private flashMessageService: FlashMessageService) { }

  ngOnInit() {
  }

  onLogoutClick($event) {
    $event.preventDefault();
    this.authService.destroySession();
    this.flashMessageService.addFlashMessage(['You are logged out!']);
    this.router.navigate(['/auth/login']);
  }
  onBtnMenuClick(evt) {
    evt.preventDefault();
    $('.ui.sidebar').sidebar('setting', {
      dimPage: false,
      transition: 'uncover'
    }).sidebar('toggle');
    $('.pusher').css({ 'padding-top': '40px' });
  }
}
