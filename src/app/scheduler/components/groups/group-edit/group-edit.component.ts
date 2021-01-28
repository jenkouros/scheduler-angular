import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '../../../../shared/app-component-base';
import { FilterTypeEnum } from '../../../models/filter.enum';
import { GroupFilterViewModel } from '../../../models/groupfilter.dto';

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.css']
})
export class GroupEditComponent extends AppComponentBase implements OnInit, OnChanges {
  @Input() groupFilter: GroupFilterViewModel | null;
  @Output() applyEditGroupFilter = new EventEmitter<GroupFilterViewModel>();
  @Output() cancelEditGroupFilter = new EventEmitter();
  @Output() changeEditGroupFilter = new EventEmitter<{ idFilter: number, idValues: number[] }>();
  @Output() changeEditGroupContainerFilter = new EventEmitter<number[]>();
  FilterTypeEnum: typeof FilterTypeEnum = FilterTypeEnum;
  groupName: string;
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.groupName = this.groupFilter
      ? this.groupFilter.name
      : '';
  }

  onFilterChange(id: number, values: number[]) {
    this.changeEditGroupFilter.emit({
      idFilter: id,
      idValues: values
    });
  }

  onContainerFilterChange(ids: number[]) {
    this.changeEditGroupContainerFilter.emit(ids);
  }

  onSubmit() {
    if (this.groupFilter) {
      this.groupFilter.name = this.groupName || this.translate('NewGroup');
      this.applyEditGroupFilter.emit(this.groupFilter);
    }
  }

  onCancel() {
    this.cancelEditGroupFilter.emit();
  }
}
