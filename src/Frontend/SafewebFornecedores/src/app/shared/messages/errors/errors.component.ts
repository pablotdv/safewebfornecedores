import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { trigger, state, style, transition, animate } from "@angular/animations"
import { Observable } from 'rxjs/Observable'
import * as $ from 'jquery';


import 'rxjs/add/observable/timer'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/switchMap'

import { NotificationErrorsService } from '../../services/notification-errors.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css']
})
export class ErrorsComponent implements OnInit {

  errors: string[];
  @ViewChild('content') contentModal: ElementRef;

  closeResult: string;

  constructor(private notificationErrorsService: NotificationErrorsService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.notificationErrorsService.notifier
      .subscribe(res => {
        this.errors = res;
        this.modalService.open(this.contentModal);
      });
  }
}
