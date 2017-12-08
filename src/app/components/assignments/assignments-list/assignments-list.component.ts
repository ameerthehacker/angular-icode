import { 
  Component, 
  OnInit, 
  Input, 
  ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { PaginationComponent } from "../../shared/pagination/pagination.component";

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
  @ViewChild(PaginationComponent)
  pagination: PaginationComponent;

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      let page = params.page ? params.page: 1;
      this.loadAssignments(page);
    });
  }

  loadAssignments(page) {
    this.activatedRoute.parent.params.subscribe((params) => {
      this.groupSlug = params.slug;
    });
    this.activatedRoute.params.subscribe((params) => {
      let groupSlug = params.slug;
      this.isLoadingAssignments = true;
      this.authService.get(`groups/${groupSlug}/assignments?page=${page}`, (response) => {
        if(!response.error) {
          this.pagination.paginate(page, response.msg.limit, response.msg.total);
          this.assignments = response.msg.docs;
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
