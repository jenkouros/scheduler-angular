import { Component, OnInit, Input } from '@angular/core';

import { PlanItem } from '../../../models/planitem.dto';

@Component({
  selector: 'app-planitem-item',
  templateUrl: './planitem-item.component.html',
  styleUrls: ['./planitem-item.component.css']
})
export class PlanitemItemComponent implements OnInit {
  @Input() planItem: PlanItem;

  constructor() { }

  ngOnInit() {
  }

}
