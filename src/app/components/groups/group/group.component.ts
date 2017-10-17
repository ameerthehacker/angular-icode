import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Group } from "../../../models/group";

import { AuthService } from "../../../services/auth/auth.service";

@Component({
  selector: 'ic-group',
  templateUrl: './group.component.html',
  styles: []
})
export class GroupComponent implements OnInit {

  @Input()
  group: Group;
  isOwner: boolean;
  @Output('delete')
  groupDeleted: EventEmitter<string> = new EventEmitter<string>();

  constructor(private authService: AuthService) { }

  ngOnInit() {
    if(this.group.userId == this.authService.getCurrentUserId()) {
      this.isOwner = true;
    }
    else {
      this.isOwner = false;
    }
  }

  onBtnDeleteClick(evt) {
    evt.preventDefault();
    this.groupDeleted.emit(this.group.slug);
  }

}
