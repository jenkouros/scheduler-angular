import { Component, Input, OnInit } from '@angular/core';
import { faExclamationCircle, faExclamationTriangle, faLock } from '@fortawesome/free-solid-svg-icons';
import { appSettings } from './../../../../../environments/environment';
import { PlanItemStatusEnum } from './../../../models/event.model';
import { PlanContainerGrid } from './../../../models/plan-container-grid.model';




@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  statusEnum = PlanItemStatusEnum;
  settings = appSettings;
  @Input() plannerItemData: PlanContainerGrid;
  @Input() viewName = '';
  faLock = faLock;
  faWarning = faExclamationTriangle;
  faExclamation = faExclamationCircle;
  constructor() { }

  ngOnInit() {
  }

}
