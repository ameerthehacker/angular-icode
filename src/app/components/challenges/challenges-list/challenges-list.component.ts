import { Component, 
  OnInit,
  ViewChild
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from "../../../services/auth/auth.service";
import { Challenge } from "../../../models/challenge";
import { PaginationComponent } from '../../shared/pagination/pagination.component'

@Component({
  selector: 'ic-challenges-list',
  templateUrl: './challenges-list.component.html'
})
export class ChallengesListComponent implements OnInit {

  challenges: Challenge[];
  @ViewChild(PaginationComponent)
  pagination: PaginationComponent

  constructor(private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      let page = params.page ? params.page: 1;  
      this.loadChallenges(page);
    });
  }

  private loadChallenges(page) {
    this.authService.get(`challenges?page=${page}`, (response: any) => {
      if(!response.error) {
        this.pagination.paginate(page, response.msg.limit, response.msg.total);
        this.challenges = response.msg.docs;   
      }
    });
  }
  onChallengeDelete(slug) {
    this.challenges.forEach((challenge, index) => {
      if(challenge.slug == slug) {
        this.challenges.splice(index, 1);
        return;
      }
    });
  }
}
