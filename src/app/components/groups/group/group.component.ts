import { 
  Component, 
  OnInit, 
  Input, 
  Output, 
  EventEmitter } from '@angular/core';
import { PaginationComponent } from '../../shared/pagination/pagination.component';

import { Group } from "../../../models/group";

import { AuthService } from "../../../services/auth/auth.service";
import { ModalService } from "../../../services/modal/modal.service";

@Component({
  selector: 'ic-group',
  templateUrl: './group.component.html',
  styles: []
})
export class GroupComponent implements OnInit {

  @Input()
  group: Group;
  isOwner: boolean;
  @Output('delete')
  groupDeleted: EventEmitter<string> = new EventEmitter<string>();

  constructor(public authService: AuthService, private modalService: ModalService) { }

  ngOnInit() {
    if(this.group.userId == this.authService.getCurrentUserId()) {
      this.isOwner = true;
    }
    else {
      this.isOwner = false;
    }
  }

  onBtnDeleteClick(evt) {
    evt.preventDefault();
    if(confirm('Are you sure to delete this group?')) {
      this.authService.delete(`groups/${this.group.slug}`, (response) => {
        if(!response.error) {
          this.groupDeleted.emit(this.group.slug);    
        }
        else {
          this.modalService.showModal('OOPS!', 'The group could not be deleted');
        }
      });
    }
  }

}
