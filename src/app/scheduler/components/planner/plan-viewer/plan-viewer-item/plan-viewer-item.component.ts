import { Component, OnInit, Input } from '@angular/core';
import { faLock, faLockOpen, faExclamationTriangle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { PlannedEvent } from '../../../../models/event.model';
import { appSettings } from '../../../../../../environments/environment';

@Component({
  selector: 'app-plan-viewer-item',
  templateUrl: './plan-viewer-item.component.html',
  styleUrls: ['./plan-viewer-item.component.css']
})
export class PlanViewerItemComponent implements OnInit {


  settings = appSettings;
  @Input() plannerItemData: PlannedEvent;
  @Input() viewName = '';
  faLock = faLock;
  faWarning = faExclamationTriangle;
  faExclamation = faExclamationCircle;
  constructor() { }

  ngOnInit() {
  }

}
