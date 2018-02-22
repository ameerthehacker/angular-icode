import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FormGroup, FormControl, Validators } from "@angular/forms";

import { AuthService } from "../../../services/auth/auth.service";
import { FlashMessageService } from "../../../services/flash-message/flash-message.service";
import { ModalService } from "../../../services/modal/modal.service";

import { Group } from "../../../models/group";

@Component({
  selector: 'ic-group-form',
  templateUrl: './group-form.component.html',
  styles: []
})
export class GroupFormComponent implements OnInit {

  groupsForm: FormGroup;
  btnSubmitText: string = "Submit";
  isFormLoading: boolean = false;
  group: Group;
  // Flag to check whether the form is for creating new group or updating
  isEditForm: boolean = false;

  constructor(public authService: AuthService, private flashMessageService: FlashMessageService, private router: Router, private activatedRoute: ActivatedRoute, private modalService: ModalService) { }

  ngOnInit() {
    this.group = new Group();    
    this.groupsForm = this.initGroupsForm(this.group);    

    this.activatedRoute.params.subscribe((params) => {
      const groupSlug = params.slug;
      if(groupSlug) {
        this.isFormLoading = true;
        this.authService.get(`groups/${groupSlug}`, (response) => {
          if(!response.error) {
            this.group = response.msg;
            this.groupsForm = this.initGroupsForm(this.group);
            this.isFormLoading = false;
            this.isEditForm = true;
          }
        }, false);
      }
    });
  }

  private initGroupsForm(group: Group): FormGroup {
    return new FormGroup({
      'name': new FormControl(group.name, Validators.required),
      'description': new FormControl(group.description, Validators.required)
    });
  }
  private setFormProcessingStatus(status: boolean) {
    this.isFormLoading = status;  
    if(status) {
      this.btnSubmitText = 'Saving...';    
    }
    else {
      this.btnSubmitText = 'Submit';    
    }
  }
  get name() {
    return this.groupsForm.get('name');
  }
  get description() {
    return this.groupsForm.get('description');
  }
  onSubmitClick() {
    let group = {
      name: this.name.value,
      description: this.description.value
    }

    this.setFormProcessingStatus(true);
    if(this.isEditForm) {
      // Perform update
      this.authService.put(`groups/${this.group.slug}`, group, (response) => {
        if(!response.error) {
          this.groupsForm.reset();
          this.flashMessageService.addFlashMessage(['The group was updated!']);
          this.router.navigate(['/']);
        }
        else {
          this.modalService.showModal('OOPS!', 'The group could not be updated');
        }
        this.setFormProcessingStatus(false);    
      });
    }
    else {
      // Create new group
      this.authService.post('groups', group, (response) => {
        if(!response.error) {
          this.groupsForm.reset();
          this.flashMessageService.addFlashMessage(['The group was created!']);
          this.router.navigate(['/']);
        }
        else {
          this.modalService.showModal('OOPS!', 'The challenge could not be saved');
        }
        this.setFormProcessingStatus(false);    
      }, false);
    }
  }

}
