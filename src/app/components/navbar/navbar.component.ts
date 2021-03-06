import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from "@angular/router";

import { AuthService } from "../../services/auth/auth.service";
import { FlashMessageService } from "../../services/flash-message/flash-message.service";
import { TimerService } from "../../services/timer/timer.service";

declare var $: any;

@Component({
  selector: 'ic-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  
  sideBarVisible: boolean = false;
  timerVisible: boolean = false;

  constructor(public authService: AuthService, private router: Router, private flashMessageService: FlashMessageService, private timerService: TimerService) { }

  ngOnInit() {
    this.router.events.filter(event => event instanceof NavigationStart).subscribe(() => {
      if(this.sideBarVisible) {
        this.toggleSidebar();
      }
    });
    this.timerService.timerStarted.subscribe(() => {
      this.timerVisible = true;
    });
    this.timerService.timerEnded.subscribe(() => {
      this.timerVisible = false;
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
    $('.ui.sidebar').sidebar('setting', {
      dimPage: false,
      transition: 'overlay',
      onShow: () => {
        this.sideBarVisible = true;
      },
      onHide: () => {
        this.sideBarVisible = false;
      }
    }).sidebar('toggle');
    $('.pusher').css({ 'padding-top': '40px' });
  }
}
