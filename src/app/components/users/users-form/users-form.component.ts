import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { 
  FormGroup,
  FormControl, 
  Validators } from '@angular/forms';

import { AuthService } from '../../../services/auth/auth.service';
import { FlashMessageService } from '../../../services/flash-message/flash-message.service';
import { ModalService } from '../../../services/modal/modal.service';

import { User } from '../../../models/user';

@Component({
  selector: 'ic-users-form',
  templateUrl: './users-form.component.html',
  styles: []
})
export class UsersFormComponent implements OnInit {

  username: string;
  isEditForm: boolean = false;
  isFormLoading: boolean = false;
  usersForm: FormGroup;
  user: User;
  btnSubmitText = 'Submit';

  constructor(public authService: AuthService, private activatedRoute: ActivatedRoute, private router: Router, private flashMessageService: FlashMessageService, private modalService: ModalService) { }

  ngOnInit() {
    this.user = new User();
    this.usersForm = this.initUsersForm(this.user);

    this.activatedRoute.params.subscribe((params) => {
      this.username = params.username;
      // Check if the form is for editing or for creation
      if(this.username) {
        this.isEditForm = true;
        this.isFormLoading = true;
        this.authService.get(`users/${this.username}`, (response) => {
          if(!response.error) {
            this.user = response.msg;
            this.usersForm = this.initUsersForm(this.user);
          }
          this.isFormLoading = false;
        }, false);
      }
      else {

      }
    });
  }

  onSubmitClick() {
    let user = new User();

    user.firstName = this.firstName.value;
    user.lastName = this.lastName.value;
    user.email = this.email.value;
    user.gender = this.gender.value;
    this.setFormProcessingStatus(true);
    this.authService.put(`users/${this.username}`, user, (response) => {
      if(!response.error) {
        this.flashMessageService.addFlashMessage(['The user was updated!']);
        this.router.navigate(['/users']);
      }
      else {
        this.modalService.showModal('OOPS!', 'The user could not be updated');
      }
      this.setFormProcessingStatus(false);
    }, false);
  } 
  private initUsersForm(user: User): FormGroup {
    return new FormGroup({
      'firstName': new FormControl(user.firstName, Validators.required),
      'lastName': new FormControl(user.lastName),
      'email': new FormControl(user.email, Validators.required),
      'gender': new FormControl(user.gender, Validators.required)
    });
  }
  private setFormProcessingStatus(status) {
    this.isFormLoading = status;
    if(status) {
      this.btnSubmitText = 'Saving...';
    }
    else {
      this.btnSubmitText = 'Submit';
    }
  }
  get firstName() {
    return this.usersForm.get('firstName');
  }
  get lastName() {
    return this.usersForm.get('lastName');
  }
  get email() {
    return this.usersForm.get('email');
  }
  get gender() {
    return this.usersForm.get('gender');
  }

}
