import { Component, OnInit, AfterViewInit } from '@angular/core';

import { ModalService } from "../../../services/modal/modal.service";

import { ModalContent } from '../../../models/modal-content';

declare var $: any;

@Component({
  selector: 'ic-modal',
  templateUrl: './modal.component.html',
  styles: []
})
export class ModalComponent implements OnInit, AfterViewInit {

  modalContent: ModalContent;

  constructor(private modalSerivce: ModalService) { }

  ngOnInit() {
    this.modalContent = new ModalContent('', '');
  }
  ngAfterViewInit() {
    this.modalSerivce.modalShown.subscribe((modalContent) => {
      this.modalContent = modalContent;
      $('.ui.basic.modal').modal('show');
    });
  }

}
