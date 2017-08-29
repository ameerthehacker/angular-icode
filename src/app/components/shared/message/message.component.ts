import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ic-message',
  templateUrl: './message.component.html'
})
export class MessageComponent implements OnInit {

  @Input() title:string = ""; 
  @Input() type:string = "";  
  @Input() class:string = "";    
  @Input() dismissible:boolean = false;
  @Input() messages: string[] | string;

  constructor() { }

  ngOnInit() {
  }

}
