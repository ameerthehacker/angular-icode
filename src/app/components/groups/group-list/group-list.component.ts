import { 
  Component, 
  OnInit, 
  Input, 
  ViewChild } from '@angular/core';

import { Group } from "../../../models/group";

import { AuthService } from "../../../services/auth/auth.service";
import { PaginationComponent } from 'app/components/shared/pagination/pagination.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ic-group-list',
  templateUrl: './group-list.component.html',
  styles: []
})
export class GroupListComponent implements OnInit {

  @Input()
  groups: Group[];
  @ViewChild(PaginationComponent)
  pagination: PaginationComponent;  

  constructor(public authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      let page = params.page ? params.page: 1;
      this.loadGroups(page);
    });
  }

  loadGroups(page) {
    this.authService.get(`groups?page=${page}`, (response) => {
      if(!response.error) {
        this.pagination.paginate(page, response.msg.limit, response.msg.total);
        this.groups = response.msg.docs;   
      }
    });
  }
  onGroupDeleted(slug: string) {
    this.groups.forEach((group, index) => {
      if(group.slug == slug) {
        this.groups.splice(index, 1);
        return;
      }
    });
  }

}
