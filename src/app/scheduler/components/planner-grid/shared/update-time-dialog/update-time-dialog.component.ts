import { Component, Input, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppComponentBase } from '../../../../../shared/app-component-base';
import * as PlanContainerGridActions from '../../../../store/actions/plan-container-grid.action';
import * as PlanItemGridActions from '../../../../store/actions/plan-item-grid.action';
import * as PlanContainerGridSelectors from '../../../../store/selectors/plan-container-grid.selectors';
import { AppState } from './../../../../../store/app.reducers';
import { PlannedEventSimple } from './../../../../models/event.model';
import { OperationChangeOriginEnum, PlanGridOperation, PlanGridOperationChange } from './../../../../models/plan-grid-operation.model';



@Component({
  selector: 'app-update-time-dialog',
  templateUrl: './update-time-dialog.component.html'
})
export class UpdateTimeDialogComponent extends AppComponentBase implements OnDestroy {
  visible: boolean;
  @Input('visible') set popupVisible(data: boolean) {
    this.visible = data;
    if (!this.visible) {
      this.resetForm();
    }
  }
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
  @Input() dayPlan = true;
  dayPlanSubscription: Subscription;

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

    this.dayPlanSubscription = store.pipe(select(PlanContainerGridSelectors.planHoursSwitch)).subscribe(v => {
      console.log(v);
      this.dayPlan = !v;
    });

    this.form = new FormGroup({
      planItemChange: new FormControl(1),
      itemChange: new FormControl(true),
      fixPlanItem: new FormControl(true),
      containerMoveSync: new FormControl(false)
    });
  }

  resetForm() {
    this.form.patchValue({
      containerMoveSync: false
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
    // this.changeData.operation.options = { }

    this.changeData.operation.options = {
      snapFurtherItems: this.form.value.itemChange,
      isUserDurationChange: this.form.value.planItemChange === 1,
      fixPlanItem: this.form.value.fixPlanItem,
      dayPlan: this.dayPlan,
      containerMoveSync: this.form.value.containerMoveSync,
      idBaseItem: this.changeData.operation.options
        ? this.changeData.operation.options.idBaseItem
        : undefined
      // dayPlan

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
        this.store.dispatch(new PlanContainerGridActions.PlanContainerGridUpdate({
          operation: this.changeData.operation as PlanGridOperation,
          allowAdd: false
        }));
        break;
      case OperationChangeOriginEnum.InfoDialog:
        const op = this.changeData.operation as PlannedEventSimple;
        if (!op.timeEnd) {
          const end = this.getMoveDates().end;
          op.timeEnd = end ? end : new Date();
        }
        if (!op.timeStartPreparation) {
          const start = this.getMoveDates().start;
          op.timeStartPreparation = start ? start : new Date();
        }
        this.store.dispatch(new PlanContainerGridActions.PlanContainerDialogGridUpdate({
          operation: op,
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

  ngOnDestroy() {
    if (this.dayPlanSubscription) {
      this.dayPlanSubscription.unsubscribe();
    }
  }
}
