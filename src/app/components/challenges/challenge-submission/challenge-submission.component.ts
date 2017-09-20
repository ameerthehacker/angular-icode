import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Challenge } from "../../../models/challenge";
import { CodeEditorComponent } from "../../code-editor/code-editor.component";

import { AuthService } from "../../../services/auth/auth.service";

@Component({
  selector: 'ic-challenge-submission',
  templateUrl: './challenge-submission.component.html',
  styles: []
})
export class ChallengeSubmissionComponent implements OnInit {

  challenge: Challenge;
  compileMessage = false;
  sampleTestCase:any = false;
  @ViewChild(CodeEditorComponent)
  codeEditorComponent: CodeEditorComponent;

  constructor(private actiavtedRoute: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    // Get the actual challenge data
    this.actiavtedRoute.params.subscribe((params) => {
      this.authService.get('challenges/' + params['slug'], (response: any) => {
        if(!response.error) {
          this.challenge = response.msg;       
        }
        else {
          // TODO: Show internal error message
        }
      });
    });
  }

  onCodeCompiled(result) {
    this.actiavtedRoute.params.subscribe((params) => {
      let body = {
        code: result.code,
        langCode: result.compiler.code
      }
      this.compileMessage = this.sampleTestCase = false;
      this.codeEditorComponent.setIsSubmitting(true);
      this.authService.post('challenges/' + params['slug'] + '/submissions', body, (response) => {
        if(response.error) {
          if(!response.compiled) {
            this.compileMessage = response.msg[0];
          }
        }
        else {
            this.compileMessage = false;                        
            this.sampleTestCase = {
              passed: response.sampleTestCasePassed,
              input: this.challenge.sampleInput,
              output: response.msg[0],
              expectedOutput: this.challenge.sampleOutput
            }
        }
        this.codeEditorComponent.setIsSubmitting(false);      
      }, false);
    });
  }
  onLanguageChanged(compiler) {
    this.codeEditorComponent.initCodeEditor(compiler, compiler.boilerplate);
  }
  onEditorLoaded(compiler) {
    this.codeEditorComponent.initCodeEditor(compiler, compiler.boilerplate);
    this.codeEditorComponent.setLoadingStatus(false);
  }

}
