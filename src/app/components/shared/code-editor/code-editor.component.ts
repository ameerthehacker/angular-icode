import { Component, OnInit, Output, Input, EventEmitter, AfterViewChecked } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";

import { AuthService } from "../../../services/auth/auth.service";

declare var CodeMirror: any;
declare var $: any;

@Component({
  selector: 'ic-code-editor',
  templateUrl: './code-editor.component.html',
  styles: []
})
export class CodeEditorComponent implements OnInit {
  
  @Output()
  onCodeCompiled: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  onCodeSubmited: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  onLanguageChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  onEditorLoaded: EventEmitter<any> = new EventEmitter<any>();
  @Input()
  canSubmitCode: boolean;
  @Input()
  isLoading:boolean = true;
  @Input()
  btnCompileText = "Compile & Test"
  @Input()
  points: any;
  codeEditor:any = false;
  compilers: Array<any>;
  compiler:any;
  languagesLoaded: boolean = false;
  isSubmitting: boolean = false;
  hasCustomInput: boolean = false;
  frmCustomInput: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.get('compilers', (response: any) => {
      if(!response.error) {
        this.compilers = response.msg;
        this.languagesLoaded = true;        
        this.onEditorLoaded.emit(this.compilers[0]); 
      }        
    }, false);
    this.frmCustomInput = new FormGroup({
      customInput: new FormControl()
    });
  }
  ngAfterViewChecked() {
    $('select.dropdown').dropdown();
  }

  initCodeEditor(compiler: any, code: string) {
    let codeEditor = document.getElementById('code-editor');
    if(!this.codeEditor) {
      this.codeEditor = CodeMirror.fromTextArea(codeEditor, {
        mode: compiler.mode,
        lineNumbers: true
      });
    }
    else{
      this.codeEditor.setOption('mode', compiler.mode);
    }
    this.compiler = compiler;
    this.codeEditor.setOption('value', code);    
  }
  setLoadingStatus(status: boolean) {
    this.isLoading = status;
  }
  setCode(code: string) {
    this.codeEditor.setOption('value', code);
  }
  onLanguageChange(evt) {
    let target = evt.target;
    this.compiler = this.compilers[target.selectedIndex];
    this.onLanguageChanged.emit(this.compilers[target.selectedIndex]);
  }
  setIsSubmitting(status: boolean) {
    this.isSubmitting = status;
  }
  onBtnCompileClick() {
    let result = {
      hasCustomInput: this.hasCustomInput,
      customInput: this.frmCustomInput.get('customInput').value,
      compiler: this.compiler,
      code: this.codeEditor.getValue()
    };
    this.onCodeCompiled.emit(result);
  }
  onBtnSubmitClick() {
    let result = {
      hasCustomInput: this.hasCustomInput,
      customInput: this.frmCustomInput.get('customInput').value,
      compiler: this.compiler,
      code: this.codeEditor.getValue()
    };
    this.onCodeSubmited.emit(result);
  }
  onCustomInputSelected(evt) {
    this.hasCustomInput = evt.target.checked;
  }

}
