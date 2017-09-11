import { Component, OnInit } from '@angular/core';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/python/python';

@Component({
  selector: 'ic-code-editor',
  templateUrl: './code-editor.component.html',
  styles: []
})
export class CodeEditorComponent implements OnInit {

  configs: any;

  constructor() { }

  ngOnInit() {
    this.configs = {
      mode: 'text/x-csrc',
      lineNumbers: true
    }
  }

  onLanguageChange(evt) {
    let target = evt.target;
    let option = target.options[target.selectedIndex];
    this.configs.mode = option.value;
  }

}
