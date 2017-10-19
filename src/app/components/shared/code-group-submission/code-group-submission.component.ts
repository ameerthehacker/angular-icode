import { Component, OnInit, AfterViewInit, Input } from '@angular/core';

import { Challenge } from '../../../models/challenge';

declare var $: any;

@Component({
  selector: 'ic-code-group-submission',
  templateUrl: './code-group-submission.component.html',
  styles: []
})
export class CodeGroupSubmissionComponent implements OnInit, AfterViewInit {

  @Input()
  challenges: Challenge[]; 
  @Input('type')
  typeOfSubmission: string;
  @Input('for')
  submissionForId: string;
  selectedChallenge: Challenge;

  constructor() { }

  ngOnInit() {  
  }
  ngAfterViewInit() {
    // Initialize the semantic ui tab
    $('.menu .item').tab();          
  }

  onBtnSolveClick(index) {
    console.log(index);
    this.selectedChallenge = this.challenges[index];
    // Change to submission tab
    $('.menu .item').tab('change tab', 'submissions');     
  }

}
