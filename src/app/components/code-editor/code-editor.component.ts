import { Component, OnInit } from '@angular/core';

declare var CodeMirror: any;

@Component({
  selector: 'ic-code-editor',
  templateUrl: './code-editor.component.html',
  styles: []
})
export class CodeEditorComponent implements OnInit {
  
  constructor() { }

  ngOnInit() {
    this.initCodeEditor('text/x-csrc');
  }

  private initCodeEditor(mode) {
    let codeEditor = document.getElementById('code-editor');
    CodeMirror.fromTextArea(codeEditor, {
        mode: mode,
        lineNumbers: true
    });
  }

  onLanguageChange(evt) {
    let target = evt.target;
    let option = target.options[target.selectedIndex];
    this.initCodeEditor(option.value);    
  }

}
