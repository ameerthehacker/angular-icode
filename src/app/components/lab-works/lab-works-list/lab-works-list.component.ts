import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { LabWork } from "../../../models/lab-work";

import { AuthService } from "../../../services/auth/auth.service";

@Component({
  selector: 'ic-lab-works-list',
  templateUrl: './lab-works-list.component.html',
  styles: []
})
export class LabWorksListComponent implements OnInit {

  labWorks: LabWork[] = [];
  groupSlug: string;
  isLoadingLabWorks: boolean;

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.parent.params.subscribe((params) => {
      this.groupSlug = params.slug;
    });
    this.activatedRoute.params.subscribe((params) => {
      let groupSlug = params.slug;
      this.isLoadingLabWorks = true;
      this.authService.get(`groups/${groupSlug}/lab-works`, (response) => {
        if(!response.error) {
          this.labWorks = response.msg;
        }
        this.isLoadingLabWorks = false;
      });
    });
  }
  onLabWorkDeleted(slug) {
    this.labWorks.forEach((labWork, index) => {
      if(labWork.slug == slug) {
        this.labWorks.splice(index, 1);
      }
    });
  }
}
