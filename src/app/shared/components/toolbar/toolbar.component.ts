import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Toolbar, ToolbarItemStateEnum, ToolbarItem, ToolbarItemTypeEnum } from './toolbar.model';

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
}
