import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Assignment } from "../../../models/assignment";

import { AuthService } from "../../../services/auth/auth.service";

@Component({
  selector: 'ic-assignments-list',
  templateUrl: './assignments-list.component.html',
  styles: []
})
export class AssignmentsListComponent implements OnInit {

  assignments: Assignment[] = [];
  groupSlug: string;
  isLoadingAssignments: boolean;

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.parent.params.subscribe((params) => {
      this.groupSlug = params.slug;
    });
    this.activatedRoute.params.subscribe((params) => {
      let groupSlug = params.slug;
      this.isLoadingAssignments = true;
      this.authService.get(`groups/${groupSlug}/assignments`, (response) => {
        if(!response.error) {
          this.assignments = response.msg;
        }
        this.isLoadingAssignments = false;
      });
    });
  }
  onAssignmentDeleted(slug) {
    this.assignments.forEach((assignment, index) => {
      if(assignment.slug == slug) {
        this.assignments.splice(index, 1);
      }
    });
  }
}
