import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Toolbar, ToolbarItem, ToolbarItemStateEnum, ToolbarItemTypeEnum } from './toolbar.model';

@Component({
  selector: 'app-process-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  states = ToolbarItemStateEnum;
  types = ToolbarItemTypeEnum;
  @Output() selectAction = new EventEmitter<ToolbarItem>();
  @Input() toolbar: Toolbar;

  onSelectAction(item: ToolbarItem, value?: any) {
    item.value = value;
    this.selectAction.emit(item);
  }

  onCheckboxToogle(item: ToolbarItem) {
    item.value = !item.value;
    this.onSelectAction(item, item.value);
  }

  textEntered(e, item: ToolbarItem) {
    item.value = e.value;
    this.onSelectAction(item, item.value);
  }
}
