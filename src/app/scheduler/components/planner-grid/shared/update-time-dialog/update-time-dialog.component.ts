import { PlannedEventSimple } from './../../../../models/event.model';
import { AppState } from './../../../../../store/app.reducers';
import { Store } from '@ngrx/store';
import { PlanGridOperationChange, OperationChangeOriginEnum, PlanGridOperation } from './../../../../models/plan-grid-operation.model';
import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import * as PlanContainerGridActions from '../../../../store/actions/plan-container-grid.action';
import * as PlanItemGridActions from '../../../../store/actions/plan-item-grid.action';
import { AppComponentBase } from '../../../../../shared/app-component-base';

@Component({
  selector: 'app-update-time-dialog',
  templateUrl: './update-time-dialog.component.html'
})
export class UpdateTimeDialogComponent extends AppComponentBase {
  @Input() visible: boolean;
  changeData: PlanGridOperationChange;
  @Input('changeData') set model(data: PlanGridOperationChange) {
    if (!data) {
      return;
    }

    this.changeData  = data;
    const now = new Date();
    let timeStart: Date = now;
    let timeEnd: Date = now;


    switch (this.changeData.changeOrigin) {
      case OperationChangeOriginEnum.ContainerGrid:
      case OperationChangeOriginEnum.ItemGrid: {
        const operation = data.operation as PlanGridOperation;
        timeEnd = new Date(operation.timeEnd);
        timeStart = new Date(operation.timeStart);
        break;
      }
      case OperationChangeOriginEnum.InfoDialog: {
        const operation = data.operation as PlannedEventSimple;
        if (operation.timeStartPreparation && operation.timeEnd) {
          timeEnd = new Date(operation.timeEnd);
          timeStart = new Date(operation.timeStartPreparation);
        }
        break;
      }
    }

    this.planItemChangeAllOptions[0].start = timeStart;
    this.planItemChangeAllOptions[0].end = timeEnd;

    const moveDates = this.getMoveDates();
    if (moveDates.start && moveDates.end) {
      this.planItemChangeAllOptions[1].start = moveDates.start;
      this.planItemChangeAllOptions[1].end = moveDates.end;
    }

    if (timeEnd.getTime() < timeStart.getTime()) {
      this.planItemChangeOptions = this.planItemChangeAllOptions.filter(i => i.id !== 1);
      this.form.patchValue({
        planItemChange: 2
      });
    } else {
      this.planItemChangeOptions = this.planItemChangeAllOptions;
    }
  }
  form: FormGroup;

  planItemChangeAllOptions = [
    {
      id: 1,
      text: this.translate('ChangeOperationDuration'),
      start: undefined as Date | undefined,
      end: undefined as Date | undefined },
    {
      id: 2,
      text: this.translate('MoveOperation'),
      start: undefined as Date | undefined,
      end: undefined as Date | undefined
    },
  ];
  planItemChangeOptions: {id: number, text: string, start: Date | undefined, end: Date | undefined}[] = [];

  constructor(private store: Store<AppState>) {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);

    this.form = new FormGroup({
      planItemChange: new FormControl(1),
      itemChange: new FormControl(true),
    });
  }

  getMoveDates() {
    const result = {
      start: undefined as Date | undefined,
      end: undefined as Date | undefined
    };

    const diff = new Date(this.changeData.oldTimeEnd).getTime() - new Date(this.changeData.oldTimeStart).getTime();
      if (this.changeData.timeChange.timeEnd) {
        switch (this.changeData.changeOrigin) {
          case OperationChangeOriginEnum.ContainerGrid:
          case OperationChangeOriginEnum.ItemGrid: {
            const operation = this.changeData.operation as PlanGridOperation;
            result.end = new Date(operation.timeEnd);
            result.start = new Date(new Date(operation.timeEnd).getTime() - diff);
            break;
          }
          case OperationChangeOriginEnum.InfoDialog: {
            const operation = this.changeData.operation as PlannedEventSimple;
            if (operation.timeEnd) {
              result.end = new Date(operation.timeEnd);
              result.start = new Date(new Date(operation.timeEnd).getTime() - diff);
            }
            break;
          }
        }
      } else if (this.changeData.timeChange.timeStart) {
        switch (this.changeData.changeOrigin) {
          case OperationChangeOriginEnum.ContainerGrid:
          case OperationChangeOriginEnum.ItemGrid: {
            const operation = this.changeData.operation as PlanGridOperation;
            result.start = new Date(operation.timeStart);
            result.end = new Date(new Date(operation.timeStart).getTime() + diff);
            break;
          }
          case OperationChangeOriginEnum.InfoDialog: {
            const operation = this.changeData.operation as PlannedEventSimple;
            if (operation.timeStartPreparation) {
              result.start = new Date(operation.timeStartPreparation);
              result.end = new Date(new Date(operation.timeStartPreparation).getTime() + diff);
            }
            break;
          }
        }
      }
      return result;
  }

  onSubmit() {
    this.changeData.operation.options = {
      snapFurtherItems: this.form.value.itemChange
    };

    if (this.form.value.planItemChange === 2) {
      const moveDates = this.getMoveDates();
      if (moveDates.end && moveDates.start) {
        switch (this.changeData.changeOrigin) {
          case OperationChangeOriginEnum.ContainerGrid:
          case OperationChangeOriginEnum.ItemGrid: {
            const operation = this.changeData.operation as PlanGridOperation;
            operation.timeStart = moveDates.start;
            operation.timeEnd = moveDates.end;
            break;
          }
          case OperationChangeOriginEnum.InfoDialog: {
            const operation = this.changeData.operation as PlannedEventSimple;
            operation.timeStartPreparation = moveDates.start;
            operation.timeEnd = moveDates.end;
            break;
          }
        }
      }
    }

    switch (this.changeData.changeOrigin) {
      case OperationChangeOriginEnum.ContainerGrid:
        this.store.dispatch(new PlanContainerGridActions.PlanContainerGridUpdate(this.changeData.operation as PlanGridOperation));
        break;
      case OperationChangeOriginEnum.InfoDialog:
        this.store.dispatch(new PlanContainerGridActions.PlanContainerDialogGridUpdate({
          operation: this.changeData.operation as PlannedEventSimple,
          idPlanItem: this.changeData.planItemId ? this.changeData.planItemId : 0
        }));
        break;
      case OperationChangeOriginEnum.ItemGrid:
        this.store.dispatch(new PlanItemGridActions.PlanItemGridUpdate(this.changeData.operation as PlanGridOperation));
        break;
    }
  }

  onCancel() {
    this.store.dispatch(new PlanContainerGridActions.HideUpdatePlanGridOperationDialog());
  }

}
