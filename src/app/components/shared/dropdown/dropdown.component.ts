import { 
  Component, 
  OnInit, 
  Input, 
  Output,
  EventEmitter } from '@angular/core';

declare var $: any;

@Component({
  selector: 'ic-dropdown',
  templateUrl: './dropdown.component.html',
  styles: []
})
export class DropdownComponent implements OnInit {

  @Input()
  kind: string = "";
  @Input()
  defaultToFirst: boolean = true;
  @Input()
  items: any[];
  @Input()
  name: string;
  @Output('select')
  onItemChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    $('.dropdown').dropdown();           
  }

  onItemSelected(evt) {
    let target = evt.target;
    let item = this.items[target.value];
    if(item) {
      this.onItemChange.emit(item);    
    }
  }
  
}
