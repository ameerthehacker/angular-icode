import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ic-list',
  templateUrl: './list.component.html',
  styles: []
})
export class ListComponent implements OnInit {

  @Input()  
  title: string;
  @Input('list')
  availableItems: Array<any>;
  @Input('properties')
  objectProperties: Object;
  selectedItems: Array<any> = [];

  constructor() { }

  ngOnInit() {
  }

  onBtnAddClick(evt, selectedIndex) {
    evt.preventDefault();
    this.selectedItems.push(this.availableItems[selectedIndex]);
    this.availableItems.splice(selectedIndex, 1);
  }
  onBtnDeleteClick(evt, selectedIndex) {
    evt.preventDefault();
    this.availableItems.push(this.selectedItems[selectedIndex]);
    this.selectedItems.splice(selectedIndex, 1);
  }
}
