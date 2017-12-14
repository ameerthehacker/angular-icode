import { 
  Component, 
  OnInit, 
  ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaginationComponent } from '../../shared/pagination/pagination.component';

import { AuthService } from '../../../services/auth/auth.service';

import { User } from '../../../models/user';

@Component({
  selector: 'ic-users-list',
  templateUrl: './users-list.component.html',
  styles: []
})
export class UsersListComponent implements OnInit {

  users: User[];
  @ViewChild(PaginationComponent)
  pagination: PaginationComponent;

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      let page = params.page ? params.page: 1;
      this.loadUsers(page);
    });
  }

  loadUsers(page) {
    this.authService.get(`users?page=${page}`, (response) => {
      if(!response.error) {
        this.pagination.paginate(page, response.msg.limit, response.msg.total);
        this.users = response.msg.docs;
      }
    });
  }

}
