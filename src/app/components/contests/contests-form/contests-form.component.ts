import { Component, OnInit, ViewChild } from '@angular/core';
import { ListComponent } from "../../shared/list/list.component";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import date from 'date-and-time';

import { Contest } from "../../../models/contest";
import { Challenge } from "../../../models//challenge";


import { AuthService } from "../../../services/auth/auth.service";
import { FlashMessageService } from "../../../services/flash-message/flash-message.service";

declare var date;

@Component({
  selector: 'ic-contests-form',
  templateUrl: './contests-form.component.html',
  styles: []
})
export class ContestsFormComponent implements OnInit {

  @ViewChild(ListComponent)
  challengesList: ListComponent;
  contestsForm: FormGroup;
  contest: Contest;
  btnSubmitText: string = 'Submit';
  groupSlug: string;
  availableChallenges: Challenge[] = [];
  selectedChallenges: Challenge[] = [];  
  isFormLoading: boolean = false;
  isEditForm: boolean = false;

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute, private flashMessageServie: FlashMessageService, private router: Router) { }

  ngOnInit() {
    this.isFormLoading = true;    
    this.contest = new Contest();
    this.contestsForm = this.initContestsForm(this.contest);

    this.activatedRoute.parent.params.subscribe((params) => {
      this.groupSlug = params.slug;
    });

    this.activatedRoute.params.subscribe((params) => {
      let contestSlug = params.contestSlug;
      let challenges;
      this.authService.get('challenges', (response) => {
        if(!response.error) {
          challenges = response.msg;
          if(contestSlug) {
            this.isEditForm = true;
            // Get the contest to be edited
            this.authService.get(`groups/${this.groupSlug}/contests/${contestSlug}`, (response) => {
              if(!response.error) {
                this.contest = response.msg;
                // Format the dates in contest
                let registrationStartDate = new Date(this.contest.registrationStartDate);
                let registrationEndDate = new Date(this.contest.registrationEndDate)
                let contestStartDate = new Date(this.contest.contestStartDate)
                this.contest.registrationStartDate = date.format(registrationStartDate, 'D/M/YYYY', true);
                this.contest.registrationEndDate = date.format(registrationEndDate, 'D/M/YYYY', true);
                this.contest.contestStartDate = date.format(contestStartDate, 'D/M/YYYY h:mm A', true);
                // Load the available and selected challenges in the list
                for(let i = 0; i < challenges.length; i++) {
                  let isSelectedChallenge = this.contest.challenges.find((challenge: any) => {
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
                this.contestsForm = this.initContestsForm(this.contest);
                this.isFormLoading = false;
              }
              else {
                // TODO: Show internal error
              }
            }, false);
          }
          else {
            // Add all the challenges if its a new contest
            this.availableChallenges = challenges;
            this.isFormLoading = false;
          }
        }
        else {
          // TODO: Show internal error
        }
      }, false);
    });
  }

  private initContestsForm(contest: Contest): FormGroup {
    return new FormGroup({
      'title': new FormControl(contest.title, Validators.required),
      'description': new FormControl(contest.description, Validators.required),
      'registrationStartDate': new FormControl(contest.registrationStartDate, [Validators.required, this.validateDate]),
      'registrationEndDate': new FormControl(contest.registrationEndDate, [Validators.required, this.validateDate]),
      'contestStartDate': new FormControl(contest.contestStartDate, [Validators.required, this.validateTimeDate]),
    'duration': new FormControl(contest.duration, [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.min(1)])
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
    let contest: Contest = new Contest();
    // Get the ids of selected challenges
    let challengeIds = [];
    let selectedChallenges = this.challengesList.selectedItems;
    for(let i = 0; i < selectedChallenges.length; i++) {
      challengeIds.push(selectedChallenges[i]._id);
    }
    contest.title = this.title.value;
    contest.description = this.description.value;
    contest.registrationStartDate = this.registrationStartDate.value;
    contest.registrationEndDate = this.registrationEndDate.value;
    contest.contestStartDate = this.contestStartDate.value;
    contest.duration = this.duration.value;
    contest.challenges = challengeIds;
    
    this.setFormProcessingStatus(true);
    if(this.isEditForm) {
      this.authService.put(`groups/${this.groupSlug}/contests/${this.contest.slug}`, contest, (response) => {
        if(!response.error) { 
          this.flashMessageServie.addFlashMessage(['The contest was updated!']);          
          this.router.navigate(['/groups', this.groupSlug, 'contests']);
        }
        else {
          // TODO: Handle internal error
        }
        this.setFormProcessingStatus(false);            
      });
    }
    else {
      this.authService.post(`groups/${this.groupSlug}/contests`, contest, (response) => {
        if(!response.error) { 
          this.flashMessageServie.addFlashMessage(['The contest was created!']);          
          this.router.navigate(['/groups', this.groupSlug, 'contests']);
        }
        else {
          // TODO: Handle internal error
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
  private validateTimeDate(control: FormControl) {
    let givenTimeDate = control.value ? control.value: '';
    if(date.isValid(givenTimeDate, 'D/M/YYYY h:m A')) {
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
    return this.contestsForm.get('title');
  }
  get description() {
    return this.contestsForm.get('description');
  }
  get registrationStartDate() {
    return this.contestsForm.get('registrationStartDate');
  }
  get registrationEndDate() {
    return this.contestsForm.get('registrationEndDate');
  }
  get contestStartDate() {
    return this.contestsForm.get('contestStartDate');
  }
  get duration() {
    return this.contestsForm.get('duration');
  }
  get challenges() {
    return this.contestsForm.get('challenges');
  }
}
