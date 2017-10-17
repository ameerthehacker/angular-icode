import { Component, OnInit, Input } from '@angular/core';

import { Group } from "../../../models/group";

import { AuthService } from "../../../services/auth/auth.service";

@Component({
  selector: 'ic-group-list',
  templateUrl: './group-list.component.html',
  styles: []
})
export class GroupListComponent implements OnInit {

  @Input()
  groups: Group[];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.get('groups', (response) => {
      if(!response.error) {
        this.groups = response.msg;
      }
      else {
        // TODO: Handle internal error
      }
    });
  }

}
