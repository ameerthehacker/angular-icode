import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { AuthService } from '../../../services/auth/auth.service';
import { FlashMessageService } from "../../../services/flash-message/flash-message.service";
import { TimerService } from "../../../services/timer/timer.service";

import { Challenge } from '../../../models/challenge';
import { LabWork } from '../../../models/lab-work'

@Component({
  selector: 'ic-lab-work-submission',
  templateUrl: './lab-work-submission.component.html',
  styles: []
})
export class LabWorkSubmissionComponent implements OnInit {

  challenges: Challenge[] = [];
  groupSlug: string;
  labWorkSlug: string;
  labWork: LabWork = new LabWork();

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute, private flashMessageService: FlashMessageService, private router: Router, private timerService: TimerService) { }

  ngOnInit() {
    this.activatedRoute.parent.params.subscribe((params) => {
      this.groupSlug = params.slug;
    });
    this.activatedRoute.params.subscribe((params) => {
      this.labWorkSlug = params.labWorkSlug;
    });
    this.authService.get(`groups/${this.groupSlug}/lab-works/${this.labWorkSlug}`, (response) => {
      if(!response.error) {
        this.labWork = response.msg;
        if(!this.labWork.isRunning) {
          this.flashMessageService.addFlashMessage(['Sorry! The submissions are closed'], 'negative');          
          this.router.navigate(['/groups', this.groupSlug, 'lab-works']); 
          return;          
        }
        // Load the challenges for the labWork
        this.authService.get(`groups/${this.groupSlug}/lab-works/${this.labWorkSlug}/challenges`, (response) => {
          if(!response.error) {
            this.challenges = response.msg;
          }
        }); 
      }
    });
  }
}
