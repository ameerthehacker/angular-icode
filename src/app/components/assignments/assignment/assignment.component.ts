import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import date from 'date-and-time';

import { AuthService } from "../../../services/auth/auth.service";
import { ModalService } from "../../../services/modal/modal.service";

import { Assignment } from "../../../models/assignment";

declare var date;

@Component({
  selector: 'ic-assignment',
  templateUrl: './assignment.component.html',
  styles: []
})
export class AssignmentComponent implements OnInit {

  @Input()
  assignment: Assignment;
  canSubmit: boolean;
  btnSubmitText: string = 'Submit';
  submissionEndDate: Date;
  isOwner: boolean;
  groupSlug: string;
  @Output('delete')
  assignmentDeleted: EventEmitter<string> = new EventEmitter<string>();

  constructor(public authService: AuthService, private activatedRoute: ActivatedRoute, private modalService: ModalService) { }

  ngOnInit() {
    // Set the ownership flag
    if(this.assignment.userId == this.authService.getCurrentUserId()) {
      this.isOwner = true;
    }
    this.activatedRoute.parent.params.subscribe((params) => {
      this.groupSlug = params.slug;
    });
    // Check if registration is open
    let submissionEndDate = new Date(this.assignment.submissionEndDate);
    this.submissionEndDate = date.format(submissionEndDate, 'D MMM YYYY', true);
    if(this.assignment.isRunning) {
      this.canSubmit = true;
    }
    else {
      this.canSubmit = false;
    }
  }
  
  onBtnDeleteClick(evt) {
    evt.preventDefault();
    if(confirm('Are you sure to delete this assignment')) {
      this.authService.delete(`groups/${this.groupSlug}/assignments/${this.assignment.slug}`, (response) => {
        if(!response.error) {
          this.assignmentDeleted.emit(this.assignment.slug);
        }
        else {
          this.modalService.showModal('OOPS!', 'The assignment could not be updated');
        }
      });
    }
  }
}
