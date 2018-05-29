import { Component, OnInit, Input } from '@angular/core';
import { faLock, faLockOpen, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { PlannedEvent } from '../../../../models/event.model';

@Component({
  selector: 'app-plan-viewer-item',
  templateUrl: './plan-viewer-item.component.html',
  styleUrls: ['./plan-viewer-item.component.css']
})
export class PlanViewerItemComponent implements OnInit {

  @Input() plannerItemData: PlannedEvent;
  faLock = faLock;
  faWarning = faExclamationTriangle;
  constructor() { }

  ngOnInit() {
  }

}
