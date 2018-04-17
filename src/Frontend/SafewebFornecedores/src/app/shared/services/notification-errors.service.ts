import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class NotificationErrorsService {

  notifier = new EventEmitter<string[]>()

  notify(message: string[]) {
    this.notifier.emit(message)
  }
}
