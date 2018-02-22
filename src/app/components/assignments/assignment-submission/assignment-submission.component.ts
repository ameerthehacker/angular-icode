import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { AuthService } from '../../../services/auth/auth.service';
import { FlashMessageService } from "../../../services/flash-message/flash-message.service";
import { TimerService } from "../../../services/timer/timer.service";

import { Challenge } from '../../../models/challenge';
import { Assignment } from '../../../models/assignment'

@Component({
  selector: 'ic-assignment-submission',
  templateUrl: './assignment-submission.component.html',
  styles: []
})
export class AssignmentSubmissionComponent implements OnInit {

  challenges: Challenge[] = [];
  groupSlug: string;
  assignmentSlug: string;
  assignment: Assignment = new Assignment();

  constructor(public authService: AuthService, private activatedRoute: ActivatedRoute, private flashMessageService: FlashMessageService, private router: Router, private timerService: TimerService) { }

  ngOnInit() {
    this.activatedRoute.parent.params.subscribe((params) => {
      this.groupSlug = params.slug;
    });
    this.activatedRoute.params.subscribe((params) => {
      this.assignmentSlug = params.assignmentSlug;
    });
    this.authService.get(`groups/${this.groupSlug}/assignments/${this.assignmentSlug}`, (response) => {
      if(!response.error) {
        this.assignment = response.msg;
        if(!this.assignment.isRunning) {
          this.flashMessageService.addFlashMessage(['Sorry! The submissions are closed'], 'negative');          
          this.router.navigate(['/groups', this.groupSlug, 'assignments']); 
          return;          
        }
        // Load the challenges for the assignment
        this.authService.get(`groups/${this.groupSlug}/assignments/${this.assignmentSlug}/challenges`, (response) => {
          if(!response.error) {
            this.challenges = response.msg;
          }
        }); 
      }
    });
  }
}
