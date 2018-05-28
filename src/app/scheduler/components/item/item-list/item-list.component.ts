import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import { Item } from '../../../models/item.dto';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  @Input() store: CustomStore | null;
  @Output() selectItem = new EventEmitter<Item>();

  constructor() {}

  ngOnInit() {
  }

  onSelectItem(item: Item) {
    if (item) {
      this.selectItem.emit(item);
    }
  }
}
