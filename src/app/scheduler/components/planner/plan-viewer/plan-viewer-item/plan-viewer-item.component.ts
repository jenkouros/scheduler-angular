import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { faExclamationCircle, faExclamationTriangle, faLock } from '@fortawesome/free-solid-svg-icons';
import { appSettings } from '../../../../../../environments/environment';
import { PlannedEvent } from '../../../../models/event.model';
import { PlanItemStatusEnum } from './../../../../models/event.model';

@Component({
  selector: 'app-plan-viewer-item',
  templateUrl: './plan-viewer-item.component.html',
  styleUrls: ['./plan-viewer-item.component.css']
})
export class PlanViewerItemComponent implements OnInit, OnChanges {


  statusEnum = PlanItemStatusEnum;
  settings = appSettings;
  @Input() plannerItemData: PlannedEvent;
  @Input() viewName = '';
  faLock = faLock;
  faWarning = faExclamationTriangle;
  faExclamation = faExclamationCircle;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.plannerItemData);
  }


}
