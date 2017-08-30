import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ShowProgressService {

  showProgressEventEmitter: EventEmitter<string>;
  hideProgressEventEmitter: EventEmitter<string>;  

  constructor() { 
    this.showProgressEventEmitter = new EventEmitter<string>();
    this.hideProgressEventEmitter = new EventEmitter<string>();
  }

  showProgress(message: string) {
    this.showProgressEventEmitter.emit(message);
  }
  hideProgress() {
    this.hideProgressEventEmitter.emit();
  }
  get showProgressEvent(): EventEmitter<string> {
    return this.showProgressEventEmitter;
  }
  get hideProgressEvent(): EventEmitter<string> {
    return this.hideProgressEventEmitter;
  }

}
