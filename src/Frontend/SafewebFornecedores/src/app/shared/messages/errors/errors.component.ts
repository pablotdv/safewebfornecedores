import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from "@angular/animations"
import { Observable } from 'rxjs/Observable'

import 'rxjs/add/observable/timer'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/switchMap'

import { NotificationErrorsService } from '../../services/notification-errors.service';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css']
})
export class ErrorsComponent implements OnInit {

  errors: string[]

  constructor(private notificationErrorsService: NotificationErrorsService) { }

  ngOnInit() {
    this.notificationErrorsService.notifier
      .do(errors => {                
        this.errors = errors;
        console.log(this.errors);
      }).subscribe(res => console.log(this.errors));
  }

}
