import { 
  Component, 
  OnInit, 
  ViewChild } from '@angular/core';
import { CodeEditorComponent } from '../shared/code-editor/code-editor.component';
import { AuthService } from 'app/services/auth/auth.service';

@Component({
  selector: 'ic-playground',
  templateUrl: './playground.component.html',
  styles: []
})
export class PlaygroundComponent implements OnInit {

  @ViewChild(CodeEditorComponent)
  codeEditorComponent: CodeEditorComponent;
  output: any = false;
  compileMessage: any = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onEditorLoaded(compiler) {
    this.codeEditorComponent.setLoadingStatus(false);
    this.codeEditorComponent.initCodeEditor(compiler, compiler.boilerplate);
  }
  onLanguageChanged(compiler) {
    this.codeEditorComponent.initCodeEditor(compiler, compiler.boilerplate); 
  }
  onCodeCompiled(result) {
    const body = {
      code: result.code,
      langCode: result.compiler.code,
      input: result.customInput
    }

    this.codeEditorComponent.setIsSubmitting(true);
    this.output = this.compileMessage = false;
    this.authService.post(`compilers/${body.langCode}`, body, (response) => {
      if(response.compiled) {
        this.output = response.msg;
      }
      else {
        this.compileMessage = response.msg;
      }
      this.codeEditorComponent.setIsSubmitting(false);
    }, false);
  }

}
