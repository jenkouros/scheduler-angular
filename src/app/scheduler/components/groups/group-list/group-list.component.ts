import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { select } from '@ngrx/store';
import { GroupFilterViewModel, GroupFilter } from '../../../models/groupfilter.dto';
import { DxDataGridComponent } from 'devextreme-angular';
import { NotifyService } from '../../../../shared/services/notify.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
    @Input() groups: GroupFilterViewModel[] | null;
    @Output() groupFilterSelected = new EventEmitter<GroupFilterViewModel>();
    @Output() editGroupFilter = new EventEmitter<GroupFilterViewModel | null>();
    @Output() createGroupFilter = new EventEmitter();
    @ViewChild(DxDataGridComponent) grid: DxDataGridComponent;
    selectedGroup: GroupFilterViewModel | null = null;

    constructor(private notifyService: NotifyService) { }

    ngOnInit() {
    }

    onSelectionChange(selectionData) {
      const selection: GroupFilterViewModel = selectionData.selectedRowsData.length
            ? selectionData.selectedRowsData[selectionData.selectedRowKeys.length - 1]
            : null;
      if (selection && (!this.selectedGroup || selection.id !== this.selectedGroup.id)) {
        this.selectedGroup = selection;
      } else if (selection === null) {
        this.selectedGroup = null;
      }
      this.grid.instance.deselectRows(
          selectionData.selectedRowKeys.slice(0, selectionData.selectedRowKeys.length - 1));
    }

    confirmGroupFilter() {
      if (this.selectedGroup) {
        this.groupFilterSelected.emit(this.selectedGroup);
        this.notifyService.notifyInfo('Izbran je filter ' + this.selectedGroup.name);
        this.grid.instance.deselectAll();

      }
    }

    onCreateGroupFilter() {
      this.createGroupFilter.emit();
    }

    onEditGroupFilter() {
      this.editGroupFilter.emit(this.selectedGroup);
    }
}
