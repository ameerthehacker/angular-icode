import { Component, OnInit } from '@angular/core';

import { ShowProgressService } from "../../../services/show-progress/show-progress.service";

@Component({
  selector: 'ic-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  showProgress: boolean = false;
  message: string;

  constructor(private showProgressService: ShowProgressService) { }

  ngOnInit() {
    this.showProgressService.showProgressEvent.subscribe((message) => {
      this.showProgress = true;
      this.message = message;
    });
    this.showProgressService.hideProgressEvent.subscribe(() => {
      this.showProgress = false;
    });
  }

}
