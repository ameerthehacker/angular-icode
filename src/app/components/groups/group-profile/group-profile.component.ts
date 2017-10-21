import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from "../../../services/auth/auth.service";

import { Group } from "../../../models/group";

@Component({
  selector: 'ic-group-profile',
  templateUrl: './group-profile.component.html',
  styles: []
})
export class GroupProfileComponent implements OnInit {

  group: Group;

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      let groupSlug = params.slug;
      this.authService.get(`groups/${groupSlug}`, (response) => {
        if(!response.error) {
          this.group = response.msg;
        }
      });
    });
  }

}
