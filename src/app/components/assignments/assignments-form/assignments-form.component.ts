import { Component, OnInit, ViewChild } from '@angular/core';
import { ListComponent } from "../../shared/list/list.component";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import date from 'date-and-time';

import { Assignment } from "../../../models/assignment";
import { Challenge } from "../../../models//challenge";


import { AuthService } from "../../../services/auth/auth.service";
import { FlashMessageService } from "../../../services/flash-message/flash-message.service";
import { ModalService } from "../../../services/modal/modal.service";

declare var date;

@Component({
  selector: 'ic-assignments-form',
  templateUrl: './assignments-form.component.html',
  styles: []
})
export class AssignmentsFormComponent implements OnInit {

  @ViewChild(ListComponent)
  challengesList: ListComponent;
  assignmentsForm: FormGroup;
  assignment: Assignment;
  btnSubmitText: string = 'Submit';
  groupSlug: string;
  availableChallenges: Challenge[] = [];
  selectedChallenges: Challenge[] = [];  
  isFormLoading: boolean = false;
  isEditForm: boolean = false;

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute, private flashMessageServie: FlashMessageService, private router: Router, private modalService: ModalService) { }

  ngOnInit() {
    this.isFormLoading = true;    
    this.assignment = new Assignment();
    this.assignmentsForm = this.initassignmentsForm(this.assignment);

    this.activatedRoute.parent.params.subscribe((params) => {
      this.groupSlug = params.slug;
    });

    this.activatedRoute.params.subscribe((params) => {
      let assignmentSlug = params.assignmentSlug;
      let challenges;
      this.authService.get('challenges', (response) => {
        if(!response.error) {
          challenges = response.msg.docs;
          if(assignmentSlug) {
            this.isEditForm = true;
            // Get the assignment to be edited
            this.authService.get(`groups/${this.groupSlug}/assignments/${assignmentSlug}`, (response) => {
              if(!response.error) {
                this.assignment = response.msg;
                // Format the dates in assignment
                let submissionStartDate = new Date(this.assignment.submissionStartDate);
                let submissionEndDate = new Date(this.assignment.submissionEndDate);
                this.assignment.submissionStartDate = date.format(submissionStartDate, 'D/M/YYYY', true);
                this.assignment.submissionEndDate = date.format(submissionEndDate, 'D/M/YYYY', true);
                // Load the available and selected challenges in the list
                for(let i = 0; i < challenges.length; i++) {
                  let isSelectedChallenge = this.assignment.challenges.find((challenge: any) => {
                    return challenge == challenges[i]._id;
                  });
                  if(isSelectedChallenge) {
                    this.selectedChallenges.push(challenges[i]);
                  }
                  else {
                    this.availableChallenges.push(challenges[i]);
                  }
                }
                // Initialize the form
                this.assignmentsForm = this.initassignmentsForm(this.assignment);
                this.isFormLoading = false;
              }
            }, false);
          }
          else {
            // Add all the challenges if its a new assignment
            this.availableChallenges = challenges;
            this.isFormLoading = false;
          }
        }
      }, false);
    });
  }

  private initassignmentsForm(assignment: Assignment): FormGroup {
    return new FormGroup({
      'title': new FormControl(assignment.title, Validators.required),
      'description': new FormControl(assignment.description, Validators.required),
      'submissionStartDate': new FormControl(assignment.submissionStartDate, [Validators.required, this.validateDate]),
      'submissionEndDate': new FormControl(assignment.submissionEndDate, [Validators.required, this.validateDate])
    });
  }
  private setFormProcessingStatus(status) {
    this.isFormLoading = status;
    if(status) {
      this.btnSubmitText = 'Saving...';
    }
    else {
      this.btnSubmitText = 'Submit';
    }
  }
  onBtnSubmitClick() {
    let assignment: Assignment = new Assignment();
    // Get the ids of selected challenges
    let challengeIds = [];
    let selectedChallenges = this.challengesList.selectedItems;
    for(let i = 0; i < selectedChallenges.length; i++) {
      challengeIds.push(selectedChallenges[i]._id);
    }
    assignment.title = this.title.value;
    assignment.description = this.description.value;
    assignment.submissionStartDate = this.submissionStartDate.value;
    assignment.submissionEndDate = this.submissionEndDate.value;
    assignment.challenges = challengeIds;
    
    this.setFormProcessingStatus(true);
    if(this.isEditForm) {
      this.authService.put(`groups/${this.groupSlug}/assignments/${this.assignment.slug}`, assignment, (response) => {
        if(!response.error) { 
          this.flashMessageServie.addFlashMessage(['The assignment was updated!']);          
          this.router.navigate(['/groups', this.groupSlug, 'assignments']);
        }
        else {
          this.modalService.showModal('OOPS!', 'The assignment could not be updated');
        }
        this.setFormProcessingStatus(false);            
      });
    }
    else {
      this.authService.post(`groups/${this.groupSlug}/assignments`, assignment, (response) => {
        if(!response.error) { 
          this.flashMessageServie.addFlashMessage(['The assignment was created!']);          
          this.router.navigate(['/groups', this.groupSlug, 'assignments']);
        }
        else {
          this.modalService.showModal('OOPS!', 'The assignment could not be saved');
        }
        this.setFormProcessingStatus(false);            
      });
    }
  }
  private validateDate(control: FormControl) {
    let givenDate = control.value ? control.value: '';
    if(date.isValid(givenDate, 'D/M/YYYY')) {
      return null;
    }
    else {
      return {
        validateDate: {
          valid: false
        }
      }
    }
  }
  get title() {
    return this.assignmentsForm.get('title');
  }
  get description() {
    return this.assignmentsForm.get('description');
  }
  get submissionStartDate() {
    return this.assignmentsForm.get('submissionStartDate');
  }
  get submissionEndDate() {
    return this.assignmentsForm.get('submissionEndDate');
  }
  get challenges() {
    return this.assignmentsForm.get('challenges');
  }
}
