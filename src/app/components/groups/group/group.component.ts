import { Component, OnInit, Input } from '@angular/core';

import { Group } from "../../../models/group";

@Component({
  selector: 'ic-group',
  templateUrl: './group.component.html',
  styles: []
})
export class GroupComponent implements OnInit {

  @Input()
  group: Group;

  constructor() { }

  ngOnInit() {
  }

}
