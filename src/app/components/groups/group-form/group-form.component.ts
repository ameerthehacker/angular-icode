import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, FormControl, Validators } from "@angular/forms";

import { AuthService } from "../../../services/auth/auth.service";
import { FlashMessageService } from "../../../services/flash-message/flash-message.service";

@Component({
  selector: 'ic-group-form',
  templateUrl: './group-form.component.html',
  styles: []
})
export class GroupFormComponent implements OnInit {

  groupsForm: FormGroup;
  btnSubmitText: string = "Submit";
  isFormSubmitting: boolean = false;

  constructor(private authService: AuthService, private flashMessageService: FlashMessageService, private router: Router) { }

  ngOnInit() {
    this.groupsForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required)      
    });
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

    this.isFormSubmitting = true;
    this.btnSubmitText = 'Saving...';
    this.authService.post('groups', group, (response) => {
      if(!response.error) {
        this.groupsForm.reset();
        this.flashMessageService.addFlashMessage(['The group was created!']);
        this.router.navigate(['/']);
      }
      else {
        // TODO: Handle internal error
      }
      this.isFormSubmitting = false;
      this.btnSubmitText = 'Submit';
    }, false);
  }

}
