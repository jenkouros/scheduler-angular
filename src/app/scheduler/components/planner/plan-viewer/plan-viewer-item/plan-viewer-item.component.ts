import { Component, OnInit, Input } from '@angular/core';
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-plan-viewer-item',
  templateUrl: './plan-viewer-item.component.html',
  styleUrls: ['./plan-viewer-item.component.css']
})
export class PlanViewerItemComponent implements OnInit {

  @Input() plannerItemData: any;
  faLock = faLock;

  constructor() { }

  ngOnInit() {
  }

}