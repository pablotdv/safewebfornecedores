import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class UserInfoService {

  notifier = new EventEmitter<any>()

  notify() {
    console.log('UserInfoService/notify');
    this.notifier.emit();
  }

}
