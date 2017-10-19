import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Contest } from "../../../models/contest";

import { AuthService } from "../../../services/auth/auth.service";

@Component({
  selector: 'ic-contests-list',
  templateUrl: './contests-list.component.html',
  styles: []
})
export class ContestsListComponent implements OnInit {

  contests: Contest[] = [];
  groupSlug: string;
  isLoadingContests: boolean;

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.parent.params.subscribe((params) => {
      this.groupSlug = params.slug;
    });
    this.activatedRoute.params.subscribe((params) => {
      let groupSlug = params.slug;
      this.isLoadingContests = true;
      this.authService.get(`groups/${groupSlug}/contests`, (response) => {
        if(!response.error) {
          this.contests = response.msg;
        }
        else {
          // TODO: show internal server error
        }
        this.isLoadingContests = false;
      });
    });
  }
  onContestDeleted(slug) {
    this.contests.forEach((contest, index) => {
      if(contest.slug == slug) {
        this.contests.splice(index, 1);
      }
    });
  }

}
