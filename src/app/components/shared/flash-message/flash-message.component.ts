import { Component, OnInit } from '@angular/core';
import { FlashMessage } from "../../../models/flash-message";
import { Router, NavigationEnd } from "@angular/router";

import { FlashMessageService } from "../../../services/flash-message/flash-message.service";

@Component({
  selector: 'ic-flash-message',
  templateUrl: './flash-message.component.html',
  styles: []
})
export class FlashMessageComponent implements OnInit {

  flashMessage: FlashMessage;

  constructor(private flashMessageService: FlashMessageService, private router: Router) { }

  ngOnInit() { 
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe(() => {
      this.flashMessage = this.flashMessageService.getFlashMessage();      
    })
  }

}
