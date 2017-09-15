import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { Challenge } from "../../../models/challenge";
import { Router } from "@angular/router";

import { AuthService } from "../../../services/auth/auth.service";
import { FlashMessageService } from "../../../services/flash-message/flash-message.service";

@Component({
  selector: 'ic-challenges-form',
  templateUrl: './challenges-form.component.html',
  styles: []
})
export class ChallengesFormComponent implements OnInit {

  challengesForm: FormGroup;
  btnSubmitText: string = "Submit";
  isFormSubmitting: boolean = false;

  constructor(private authService: AuthService, private flashMessageService: FlashMessageService, private router: Router) { }

  ngOnInit() {
    this.challengesForm = new FormGroup({
      'title': new FormControl('', Validators.required),
      'problemStatement': new FormControl('', Validators.required),
      'inputFormat': new FormControl('', Validators.required),
      'outputFormat': new FormControl('', Validators.required),
      'constraints': new FormControl('', Validators.required),      
      'sampleInput': new FormControl('', Validators.required),
      'sampleOutput': new FormControl('', Validators.required),
      'explanation': new FormControl('', Validators.required),
      'testCases': new FormArray([
        this.initTestCaseForm()
      ])
    });
    
  }
  private initTestCaseForm() {
    let testCaseForm = new FormGroup({
        'input': new FormControl('', Validators.required),
        'output': new FormControl('', Validators.required)
      });
    return testCaseForm;
  }
  onSubmitClick() {
    let challenge: Challenge = new Challenge();
    challenge.title = this.title.value;
    challenge.problemStatement = this.problemStatement.value;
    challenge.inputFormat = this.inputFormat.value;
    challenge.outputFormat = this.outputFormat.value;
    challenge.constraints = this.constraints.value;
    challenge.sampleInput = this.sampleInput.value;
    challenge.sampleOutput = this.sampleOutput.value;
    challenge.explanation = this.explanation.value;
    challenge.testCases = [];
    (<FormArray>this.challengesForm.get('testCases')).controls.forEach((control) => {
      let testCase = {
        'input': control.get('input').value,
        'output': control.get('output').value
      }
      challenge.testCases.push(testCase);
    });

    this.btnSubmitText = "Saving...";
    this.isFormSubmitting = true;
    this.authService.post('challenges', challenge, (response: any) => {
      if(!response.error){
        this.flashMessageService.addFlashMessage(['The challenge was created!']);
        this.router.navigate(['/challenges']);
      }
      this.isFormSubmitting = false;
    });
  }
  onBtnAddTestCaseClick() {
    let newTestCaseForm = this.initTestCaseForm();
    (<FormArray>this.challengesForm.get('testCases')).push(newTestCaseForm);
  }
  onBtnRemoveTestCaseClick(i: number) {
    (<FormArray>this.challengesForm.get('testCases')).removeAt(i);
  }
  get title() {
    return this.challengesForm.get('title');
  }
  get problemStatement() {
    return this.challengesForm.get('problemStatement');
  }
  get inputFormat() {
    return this.challengesForm.get('inputFormat');
  }
  get outputFormat() {
    return this.challengesForm.get('outputFormat');
  }
  get constraints() {
    return this.challengesForm.get('constraints');
  }
  get sampleInput() {
    return this.challengesForm.get('sampleInput');
  }
  get sampleOutput() {
    return this.challengesForm.get('sampleOutput');
  }
  get explanation() {
    return this.challengesForm.get('explanation');
  }
  input(i) {
    return (<FormArray>this.challengesForm.get('testCases')).controls[i].get('input');
  }
  output(i) {
    return (<FormArray>this.challengesForm.get('testCases')).controls[i].get('output');
  }
}
