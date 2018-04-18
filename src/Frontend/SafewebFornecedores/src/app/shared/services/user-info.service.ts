import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class UserInfoService {

  notifier = new EventEmitter<any>()

  notify() {    
    this.notifier.emit();
  }

}
