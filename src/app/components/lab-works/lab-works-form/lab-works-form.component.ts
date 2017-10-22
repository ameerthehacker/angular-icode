import { Component, OnInit, ViewChild } from '@angular/core';
import { ListComponent } from "../../shared/list/list.component";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import date from 'date-and-time';

import { LabWork } from "../../../models/lab-work";
import { Challenge } from "../../../models//challenge";


import { AuthService } from "../../../services/auth/auth.service";
import { FlashMessageService } from "../../../services/flash-message/flash-message.service";
import { ModalService } from "../../../services/modal/modal.service";

declare var date;

@Component({
  selector: 'ic-lab-works-form',
  templateUrl: './lab-works-form.component.html',
  styles: []
})
export class LabWorksFormComponent implements OnInit {

  @ViewChild(ListComponent)
  challengesList: ListComponent;
  labWorksForm: FormGroup;
  labWork: LabWork;
  btnSubmitText: string = 'Submit';
  groupSlug: string;
  availableChallenges: Challenge[] = [];
  selectedChallenges: Challenge[] = [];  
  isFormLoading: boolean = false;
  isEditForm: boolean = false;

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute, private flashMessageServie: FlashMessageService, private router: Router, private modalService: ModalService) { }

  ngOnInit() {
    this.isFormLoading = true;    
    this.labWork = new LabWork();
    this.labWorksForm = this.initlabWorksForm(this.labWork);

    this.activatedRoute.parent.params.subscribe((params) => {
      this.groupSlug = params.slug;
    });

    this.activatedRoute.params.subscribe((params) => {
      let labWorkSlug = params.labWorkSlug;
      let challenges;
      this.authService.get('challenges', (response) => {
        if(!response.error) {
          challenges = response.msg;
          if(labWorkSlug) {
            this.isEditForm = true;
            // Get the labWork to be edited
            this.authService.get(`groups/${this.groupSlug}/lab-works/${labWorkSlug}`, (response) => {
              if(!response.error) {
                this.labWork = response.msg;
                // Format the dates in labWork
                let submissionStartDate = new Date(this.labWork.submissionStartDate);
                let submissionEndDate = new Date(this.labWork.submissionEndDate);
                this.labWork.submissionStartDate = date.format(submissionStartDate, 'D/M/YYYY', true);
                this.labWork.submissionEndDate = date.format(submissionEndDate, 'D/M/YYYY', true);
                // Load the available and selected challenges in the list
                for(let i = 0; i < challenges.length; i++) {
                  let isSelectedChallenge = this.labWork.challenges.find((challenge: any) => {
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
                this.labWorksForm = this.initlabWorksForm(this.labWork);
                this.isFormLoading = false;
              }
            }, false);
          }
          else {
            // Add all the challenges if its a new labWork
            this.availableChallenges = challenges;
            this.isFormLoading = false;
          }
        }
      }, false);
    });
  }

  private initlabWorksForm(labWork: LabWork): FormGroup {
    return new FormGroup({
      'title': new FormControl(labWork.title, Validators.required),
      'description': new FormControl(labWork.description, Validators.required),
      'submissionStartDate': new FormControl(labWork.submissionStartDate, [Validators.required, this.validateDate]),
      'submissionEndDate': new FormControl(labWork.submissionEndDate, [Validators.required, this.validateDate])
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
    let labWork: LabWork = new LabWork();
    // Get the ids of selected challenges
    let challengeIds = [];
    let selectedChallenges = this.challengesList.selectedItems;
    for(let i = 0; i < selectedChallenges.length; i++) {
      challengeIds.push(selectedChallenges[i]._id);
    }
    labWork.title = this.title.value;
    labWork.description = this.description.value;
    labWork.submissionStartDate = this.submissionStartDate.value;
    labWork.submissionEndDate = this.submissionEndDate.value;
    labWork.challenges = challengeIds;
    
    this.setFormProcessingStatus(true);
    if(this.isEditForm) {
      this.authService.put(`groups/${this.groupSlug}/lab-works/${this.labWork.slug}`, labWork, (response) => {
        if(!response.error) { 
          this.flashMessageServie.addFlashMessage(['The lab work was updated!']);          
          this.router.navigate(['/groups', this.groupSlug, 'lab-works']);
        }
        else {
          this.modalService.showModal('OOPS!', 'The lab work could not be updated');
        }
        this.setFormProcessingStatus(false);            
      });
    }
    else {
      this.authService.post(`groups/${this.groupSlug}/lab-works`, labWork, (response) => {
        if(!response.error) { 
          this.flashMessageServie.addFlashMessage(['The lab work was created!']);          
          this.router.navigate(['/groups', this.groupSlug, 'lab-works']);
        }
        else {
          this.modalService.showModal('OOPS!', 'The lab work could not be saved');
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
    return this.labWorksForm.get('title');
  }
  get description() {
    return this.labWorksForm.get('description');
  }
  get submissionStartDate() {
    return this.labWorksForm.get('submissionStartDate');
  }
  get submissionEndDate() {
    return this.labWorksForm.get('submissionEndDate');
  }
  get challenges() {
    return this.labWorksForm.get('challenges');
  }
}
