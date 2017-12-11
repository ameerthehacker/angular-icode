import { 
  Component, 
  OnInit, 
  AfterViewChecked } from '@angular/core';
import { 
  FormGroup, 
  FormControl, 
  FormArray, 
  Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

import { AuthService } from "../../../services/auth/auth.service";
import { FlashMessageService } from "../../../services/flash-message/flash-message.service";
import { ModalService } from "../../../services/modal/modal.service";

import { Challenge } from "../../../models/challenge";

declare var $: any;
declare var CodeMirror: any;

@Component({
  selector: 'ic-challenges-form',
  templateUrl: './challenges-form.component.html',
  styles: []
})
export class ChallengesFormComponent implements OnInit, AfterViewChecked {

  challengesForm: FormGroup;
  btnSubmitText: string = "Submit";
  isFormLoading: boolean = false;
  challenge: Challenge;
  compilers: any[];
  boilerPlatesLoading: boolean = true;
  // Flag to indicate whether form is used for creating challenge or for updating
  isEditForm: boolean = false;
  codeEditors: any[] = [];

  constructor(private authService: AuthService, private flashMessageService: FlashMessageService, private router: Router, private activatedRoute: ActivatedRoute, private modalService: ModalService) { }

  ngOnInit() {
    this.compilers = [];
    this.challenge = new Challenge();
    this.challenge.testCases = [];
    this.challenge.boilerplates = [];
    this.challengesForm = this.initChallengesForm(this.challenge);
    
    this.activatedRoute.params.subscribe((params) => {
      let challengeSlug = params.slug;
      if(challengeSlug) {
        this.isEditForm = true;
        this.isFormLoading = true;
        this.authService.get(`challenges/${challengeSlug}`, (response) => {
          if(!response.error) {
            this.challenge = response.msg;
            // Get the compilers to init the boilerplates form
            this.authService.get('compilers', (response: any) => {
              if(!response.error) {
                this.compilers = response.msg;
                this.challengesForm = this.initChallengesForm(this.challenge);
                this.isFormLoading = false;            
              }        
            }, false);
          }
        }, false);
      }
      else {
        this.isFormLoading = true;
        this.authService.get('compilers', (response: any) => {
          if(!response.error) {
            this.compilers = response.msg;
            this.isFormLoading = false;            
          }        
        }, false);
      }
    });
  }
  ngAfterViewChecked() {
    $('select.dropdown').dropdown();
    // Initialize all the existing code editors once the form is loaded
    if(!this.isFormLoading && this.boilerPlatesLoading) {
      this.challenge.boilerplates.forEach((boilerplate:any, index) => {
        let compiler = this.getCompilerByCode(boilerplate.code);
        this.initCodeEditor(index, compiler);
      });
      this.boilerPlatesLoading = false;
    }
  }

  private initCodeEditor(i, compiler) {
    let boilerplate = document.getElementById(`boilerplate-${i + 1}`);    
    
    if(!this.codeEditors[i]) {
      this.codeEditors[i] = CodeMirror.fromTextArea(boilerplate, {
        mode: compiler.mode,
        lineNumbers: true
      });
    }
    else {
      this.codeEditors[i].setOption('mode', compiler.mode);
    }
  }
  private getCompilerByCode(code) {
    let compiler = this.compilers.find((compiler) => compiler.code == code); 
    return compiler;
  }
  private setFormProcessingStatus(status: boolean) {
    this.isFormLoading = status;
    if(status) {
      this.btnSubmitText = 'Saving...';
    }
    else {
      this.btnSubmitText = 'Submit';      
    }
  }
  private initChallengesForm(challenge: Challenge): FormGroup {
    return new FormGroup({
      'title': new FormControl(challenge.title, Validators.required),
      'problemStatement': new FormControl(challenge.problemStatement, Validators.required),
      'inputFormat': new FormControl(challenge.inputFormat, Validators.required),
      'outputFormat': new FormControl(challenge.outputFormat, Validators.required),
      'constraints': new FormControl(challenge.constraints, Validators.required),      
      'sampleInput': new FormControl(challenge.sampleInput, Validators.required),
      'sampleOutput': new FormControl(challenge.sampleOutput, Validators.required),
      'explanation': new FormControl(challenge.explanation, Validators.required),
      'testCases': new FormArray(this.initTestCasesForm(this.challenge.testCases)),
      'boilerplates': new FormArray(this.initBoilerplatesForm(this.challenge.boilerplates))
    });
  }
  private initTestCaseForm(testCase): FormGroup {
    return new FormGroup({
      'input': new FormControl(testCase.input, Validators.required),
      'output': new FormControl(testCase.output, Validators.required)
    }); 
  }
  private initTestCasesForm(testCases): FormGroup[] {
    let testCasesForm: FormGroup[] = [];
    if(testCases.length == 0) {
      let newTestCase = { input: '', output: '' };
      let newTestCaseForm = this.initTestCaseForm(newTestCase);
      testCasesForm.push(newTestCaseForm);
    }
    testCases.forEach((testCase) => {
      let testCaseForm = this.initTestCaseForm(testCase);
      testCasesForm.push(testCaseForm);
    });
    return testCasesForm;
  }
  private initBoilerplateForm(boilerplate = { code: '', boilerplate: '' }): FormGroup {
    let boilerplateForm: FormGroup = new FormGroup({
      'langCode': new FormControl(boilerplate.code),
      'boilerplate': new FormControl(boilerplate.boilerplate)
    });

    return boilerplateForm;
  }
  private initBoilerplatesForm(boilerplates): FormGroup[] {
    let newBoilerplatesForm: FormGroup[] = [];
    if(boilerplates == undefined) {
      return newBoilerplatesForm;
    }
    boilerplates.forEach((boilerplate, index) => {
      let boilerplateForm = this.initBoilerplateForm(boilerplate);
      newBoilerplatesForm.push(boilerplateForm);
    });
    return newBoilerplatesForm;
  }
  onLanguageChanged(evt, i) {
    if(evt.target.selectedIndex != -1) {
      let code = evt.target.options[evt.target.selectedIndex].value;
      let compiler = this.getCompilerByCode(code);
      this.initCodeEditor(i, compiler);
    }
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
    challenge.boilerplates = [];    
    (<FormArray>this.challengesForm.get('testCases')).controls.forEach((control) => {
      let newTestCase = {
        'input': control.get('input').value,
        'output': control.get('output').value
      }
      challenge.testCases.push(newTestCase);
    });
    (<FormArray>this.challengesForm.get('boilerplates')).controls.forEach((control, index) => {
      let newBoilerplate = {
        'code': control.get('langCode').value,
        'boilerplate': this.codeEditors[index].getValue()
      }
      challenge.boilerplates.push(newBoilerplate);
    });

    this.setFormProcessingStatus(true);
    if(this.isEditForm) {
      // Update challenge
      this.authService.put(`challenges/${this.challenge.slug}`, challenge, (response: any) => {
        if(!response.error){
          this.flashMessageService.addFlashMessage(['The challenge was updated!']);
          this.router.navigate(['/challenges']);
        }
        else {
          this.modalService.showModal('OOPS!', 'The challenge could not be updated');
        }
        this.setFormProcessingStatus(false);    
      }, false);
    }
    else {
      // Create new challenge
      this.authService.post('challenges', challenge, (response: any) => {
        if(!response.error){
          this.flashMessageService.addFlashMessage(['The challenge was created!']);
          this.router.navigate(['/challenges']);
        }
        else {
          this.modalService.showModal('OOPS!', 'Sorry! the challenge could not be saved');
        }
        this.setFormProcessingStatus(false);    
      }, false);
    }
  }
  onBtnAddTestCaseClick() {
    let newTestCase = { input: '', output: '' };
    let newTestCaseForm = this.initTestCaseForm(newTestCase);
    (<FormArray>this.challengesForm.get('testCases')).push(newTestCaseForm);
  }
  onBtnRemoveTestCaseClick(i: number) {
    (<FormArray>this.challengesForm.get('testCases')).removeAt(i);
  }
  onBtnAddBoilerplateClick() {
    let newBoilerplateForm = this.initBoilerplateForm();
    (<FormArray>this.challengesForm.get('boilerplates')).push(newBoilerplateForm);  
  }
  onBtnRemoveBoilerplateClick(i: number) {
    (<FormArray>this.challengesForm.get('boilerplates')).removeAt(i);    
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
  get boilerplates() {
    return (<FormArray>this.challengesForm.get('boilerplates')).controls;
  }
  getBoilerplate(i) {
    return (<FormArray>this.challengesForm.get('boilerplates')).controls[i].get('boilerplate');
  }
}
