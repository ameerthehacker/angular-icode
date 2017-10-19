import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { Challenge } from "../../../models/challenge";
import { CodeEditorComponent } from "../../code-editor/code-editor.component";

import { AuthService } from "../../../services/auth/auth.service";

@Component({
  selector: 'ic-code-submission',
  templateUrl: './code-submission.component.html',
  styles: []
})
export class CodeSubmissionComponent implements OnInit {

  @Input()
  challenge: Challenge;
  compileMessage = false;
  sampleTestCase:any = false;
  @ViewChild(CodeEditorComponent)
  codeEditorComponent: CodeEditorComponent;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onCodeCompiled(result) {
    let body = {
      code: result.code,
      langCode: result.compiler.code
    }
    this.compileMessage = this.sampleTestCase = false;
    this.codeEditorComponent.setIsSubmitting(true);
    this.authService.post(`challenges/${this.challenge.slug}/submissions`, body, (response) => {
      if(response.error) {
        if(!response.compiled) {
          this.compileMessage = response.msg;
        }
      }
      else {
          this.compileMessage = false;                        
          this.sampleTestCase = {
            passed: response.sampleTestCasePassed,
            input: this.challenge.sampleInput,
            output: response.msg,
            expectedOutput: this.challenge.sampleOutput
          }
      }
      this.codeEditorComponent.setIsSubmitting(false);      
    }, false);
  }
  onLanguageChanged(compiler) {
    this.codeEditorComponent.isLoading = true;
    this.authService.get(`challenges/${this.challenge.slug}/submissions/${compiler.code}`, (response) => {
      if(response.submissionFound) {
        this.codeEditorComponent.setCode(response.submission.code);
      }
      else {
        this.codeEditorComponent.initCodeEditor(compiler, compiler.boilerplate);          
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
