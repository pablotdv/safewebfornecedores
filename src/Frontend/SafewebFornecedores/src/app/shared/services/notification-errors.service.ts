import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class NotificationErrorsService {

  notifier = new EventEmitter<string[]>()

  notify(message: string[]) {
    console.log(message);
    this.notifier.emit(message)
  }

}
