import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import { PlanItem } from '../../../models/planitem.dto';

@Component({
  selector: 'app-planitem-list',
  templateUrl: './planitem-list.component.html',
  styleUrls: ['./planitem-list.component.css']
})
export class PlanitemListComponent implements OnInit {
  @Input() store: CustomStore | null;
  @Output() selectItem = new EventEmitter<PlanItem>();

  constructor() {}

  ngOnInit() {
  }

  onSelectItem(item: PlanItem) {
    if (item) {
      this.selectItem.emit(item);
    }
  }
}
