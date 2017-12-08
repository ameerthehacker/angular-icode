import { 
  Component, 
  OnInit, 
  Input, 
  ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { PaginationComponent } from '../../shared/pagination/pagination.component';

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
  @ViewChild(PaginationComponent)
  pagination: PaginationComponent;

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      let page = params.page ? params.page: 1;
      this.loadLabWorks(page);
    });
  }

  loadLabWorks(page) {
    this.activatedRoute.parent.params.subscribe((params) => {
      this.groupSlug = params.slug;
    });
    this.activatedRoute.params.subscribe((params) => {
      let groupSlug = params.slug;
      this.isLoadingLabWorks = true;
      this.authService.get(`groups/${groupSlug}/lab-works?page=${page}`, (response) => {
        if(!response.error) {
          this.pagination.paginate(page, response.msg.limit, response.msg.total);
          this.labWorks = response.msg.docs;
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
