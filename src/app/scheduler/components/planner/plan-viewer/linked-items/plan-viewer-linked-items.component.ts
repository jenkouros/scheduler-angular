import { LinkedItemModel } from './../../../../models/event.model';
import { Component, Input, OnInit } from '@angular/core';
import { AppComponentBase } from './../../../../../shared/app-component-base';

@Component({
  selector: 'app-linked-items',
  templateUrl: './plan-viewer-linked-items.component.html',
  styleUrls: ['./plan-viewer-linked-items.component.css']
})
export class PlanViewerLinkedItemsComponent extends AppComponentBase implements OnInit {
  @Input() items: LinkedItemModel[];

  ngOnInit() {
    console.log(this.items);
  }
}
