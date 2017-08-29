import { Injectable } from '@angular/core';
import { FlashMessage } from "../../models/flash-message";

@Injectable()
export class FlashMessageService {

  flashToken = 'ic-flash-message';
  flashMessage: FlashMessage;

  constructor() { }

  addFlashMessage(message: string[], type: string = "positive") {
    this.flashMessage = new FlashMessage(message, type);
    localStorage.setItem(this.flashToken, JSON.stringify(this.flashMessage));
  }
  getFlashMessage() {
    if(localStorage.getItem(this.flashToken)) {
      let flashMessage = JSON.parse(localStorage.getItem(this.flashToken));
      localStorage.removeItem(this.flashToken);
      return flashMessage;
    }
    else {
      return false;
    }
  }

}
