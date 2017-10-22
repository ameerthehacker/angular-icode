import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import date from 'date-and-time';

import { AuthService } from "../../../services/auth/auth.service";
import { ModalService } from "../../../services/modal/modal.service";

import { LabWork } from "../../../models/lab-work";

declare var date;

@Component({
  selector: 'ic-lab-work',
  templateUrl: './lab-work.component.html',
  styles: []
})
export class LabWorkComponent implements OnInit {

  @Input()
  labWork: LabWork;
  canSubmit: boolean;
  btnSubmitText: string = 'Submit';
  submissionEndDate: Date;
  isOwner: boolean;
  groupSlug: string;
  @Output('delete')
  labWorkDeleted: EventEmitter<string> = new EventEmitter<string>();

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute, private modalService: ModalService) { }

  ngOnInit() {
    // Set the ownership flag
    if(this.labWork.userId == this.authService.getCurrentUserId()) {
      this.isOwner = true;
    }
    this.activatedRoute.parent.params.subscribe((params) => {
      this.groupSlug = params.slug;
    });
    // Check if registration is open
    let submissionEndDate = new Date(this.labWork.submissionEndDate);
    this.submissionEndDate = date.format(submissionEndDate, 'D MMM YYYY', true);
    if(this.labWork.isRunning) {
      this.canSubmit = true;
    }
    else {
      this.canSubmit = false;
    }
  }
  
  onBtnDeleteClick(evt) {
    evt.preventDefault();
    if(confirm('Are you sure to delete this labWork')) {
      this.authService.delete(`groups/${this.groupSlug}/labWorks/${this.labWork.slug}`, (response) => {
        if(!response.error) {
          this.labWorkDeleted.emit(this.labWork.slug);
        }
        else {
          this.modalService.showModal('OOPS!', 'The labWork could not be updated');
        }
      });
    }
  }
}
