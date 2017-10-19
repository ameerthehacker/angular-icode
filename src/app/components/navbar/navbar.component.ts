import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from "@angular/router";

import { AuthService } from "../../services/auth/auth.service";
import { FlashMessageService } from "../../services/flash-message/flash-message.service";

declare var $:any;

@Component({
  selector: 'ic-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  
  sideBarVisible: boolean = false;

  constructor(private authService: AuthService, private router: Router, private flashMessageService: FlashMessageService) { }

  ngOnInit() {
    this.router.events.filter(event => event instanceof NavigationStart).subscribe(() => {
      if(this.sideBarVisible) {
        this.toggleSidebar();
      }
    });
  }

  onLogoutClick($event) {
    $event.preventDefault();
    this.authService.destroySession();
    this.flashMessageService.addFlashMessage(['You are logged out!']);
    this.router.navigate(['/auth/login']);
  }
  onBtnMenuClick(evt) {
    evt.preventDefault();
    this.toggleSidebar();
  }
  private toggleSidebar() {
    this.sideBarVisible = !this.sideBarVisible;
    $('.ui.sidebar').sidebar('setting', {
      dimPage: false,
      transition: 'overlay'
    }).sidebar('toggle');
    $('.pusher').css({ 'padding-top': '40px' });
  }
}
