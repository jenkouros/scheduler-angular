import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GroupSelectorViewModel } from '../../../models/groupfilter.dto';
import { AppComponentBase } from '../../../../shared/app-component-base';



@Component({
  selector: 'app-group-selector',
  templateUrl: './groupselector.component.html',
  styleUrls: ['./groupselector.component.css']
})
export class GroupSelectorComponent extends AppComponentBase {
   @Input() groups: GroupSelectorViewModel[] | null;
   @Output() selected = new EventEmitter<GroupSelectorViewModel | null>();

   selectedItem: GroupSelectorViewModel | null = null;
   constructor() {
     super();
   }
   saveSelectedItem() {
     this.selected.emit(this.selectedItem);
   }
}
