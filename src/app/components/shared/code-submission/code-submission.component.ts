import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { Challenge } from "../../../models/challenge";
import { CodeEditorComponent } from "../../shared/code-editor/code-editor.component";

import { AuthService } from "../../../services/auth/auth.service";

import * as uniqid from "uniqid";

@Component({
  selector: 'ic-code-submission',
  templateUrl: './code-submission.component.html',
  styles: []
})
export class CodeSubmissionComponent implements OnInit {

  @Input()
  challenge: Challenge;
  @Input('type')
  typeOfSubmission: string;
  @Input('for')
  submittedForId: string;
  points: any;
  compileMessage = false;
  sampleTestCasesResult:any = [];
  @ViewChild(CodeEditorComponent)
  codeEditorComponent: CodeEditorComponent;
  testCaseResults: Object[] = [];
  sampleTestCasePassed: boolean;
  customTestCase: any = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onCodeCompiled(result) {
    const uid = uniqid();
    // Initialize the testcases with false status
    this.testCaseResults = new Array(this.challenge.testCases.length);
    for(let i = 0; i < this.testCaseResults.length; i++) {
      this.testCaseResults[i] = false;
    }
    let body = {
      code: result.code,
      langCode: result.compiler.code,
      typeOfSubmission: this.typeOfSubmission,
      submittedForId: this.submittedForId,
      uid: uid,
      hasCustomInput: result.hasCustomInput,
      customInput: result.customInput
    }
    // Listen for events
    const socket = this.authService.getSocketObservable(uid).subscribe((data) => {
      if(data.type == 'customInput') {
        let result = data.result;

        if(result.error) {
          if(!result.compiled) {
            this.compileMessage = result.msg;
          }
          socket.unsubscribe();
        }
        else {
            this.compileMessage = false;                        
            this.customTestCase = {
              input: result.input,
              output: result.msg
            }
        }
      }
      else if(data.type == 'sampleTestCase') {
        this.sampleTestCasesResult = data.result.msg;
        this.sampleTestCasePassed = data.result.passed;
      }
      else if(data.type == 'testCase') {
        this.testCaseResults[data.index] = data.result;
      }
    });
    this.compileMessage = this.customTestCase = this.sampleTestCasePassed = false;
    this.sampleTestCasesResult = [];
    this.codeEditorComponent.setIsSubmitting(true);
    this.authService.post(`challenges/${this.challenge.slug}/submissions`, body, (response) => {
      this.points = response.points;    
      if(response.error) {
        if(!response.compiled) {
          this.compileMessage = response.msg;
          socket.unsubscribe();
        }
      }
      this.codeEditorComponent.setIsSubmitting(false);      
    }, false);
  }
  onLanguageChanged(compiler) {
    this.codeEditorComponent.isLoading = true;
    this.authService.get(`challenges/${this.challenge.slug}/submissions/${compiler.code}?type=${this.typeOfSubmission}&for=${this.submittedForId}`, (response) => {
      if(response.submissionFound) {
        this.points = response.submission.points;
        this.codeEditorComponent.setCode(response.submission.code);
      }
      else {
        let boilerplate: any = this.challenge.boilerplates.find((boilerplate: any) => boilerplate.code == compiler.code);
        if(boilerplate) {
          this.codeEditorComponent.setCode(boilerplate.boilerplate);
        }
        else {
          this.codeEditorComponent.initCodeEditor(compiler, compiler.boilerplate);
        }         
      }
      this.codeEditorComponent.isLoading = false;
    }, false);
  }
  onEditorLoaded(compiler) {
    // Trigger this event to load the submission for first listed language
    this.onLanguageChanged(compiler);
    this.codeEditorComponent.initCodeEditor(compiler, compiler.boilerplate);
    this.codeEditorComponent.setLoadingStatus(false);
  }

}
