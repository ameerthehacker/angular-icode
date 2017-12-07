import { 
  Component, 
  OnInit, 
  Input, 
  ViewChild } from '@angular/core';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
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
  @ViewChild(PaginationComponent)
  pagination: PaginationComponent;

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      let page = params.page ? params.page: 1;
      this.loadContests(page);
    });
  }

  loadContests(page) {
    this.activatedRoute.parent.params.subscribe((params) => {
      this.groupSlug = params.slug;
    });
    this.activatedRoute.params.subscribe((params) => {
      let groupSlug = params.slug;
      this.isLoadingContests = true;
      this.authService.get(`groups/${groupSlug}/contests?page=${page}`, (response) => {
        if(!response.error) {
          this.pagination.paginate(page, response.msg.limit, response.msg.total);
          this.contests = response.msg.docs;
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
