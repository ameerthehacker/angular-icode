import { Injectable, EventEmitter } from '@angular/core';

import { ModalContent } from '../../models/modal-content';

@Injectable()
export class ModalService {

  modalContent: ModalContent;

  public modalShown: EventEmitter<Object> = new EventEmitter<Object>();

  constructor() { }

  showModal(title: string, body: string, icon: string = '') {
    const modalContent = new ModalContent(title, body, icon);
    this.modalShown.emit(modalContent);
  }
}
