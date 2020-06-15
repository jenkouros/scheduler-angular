import { PlannedEventSimple } from './../../../../models/event.model';
import { AppState } from './../../../../../store/app.reducers';
import { Store } from '@ngrx/store';
import { PlanGridOperationChange, OperationChangeOriginEnum, PlanGridOperation } from './../../../../models/plan-grid-operation.model';
import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import * as PlanContainerGridActions from '../../../../store/actions/plan-container-grid.action';
import * as PlanItemGridActions from '../../../../store/actions/plan-item-grid.action';

@Component({
  selector: 'app-update-time-dialog',
  templateUrl: './update-time-dialog.component.html'
})
export class UpdateTimeDialogComponent {
  @Input() visible: boolean;
  changeData: PlanGridOperationChange;
  @Input('changeData') set model(data: PlanGridOperationChange) {
    if (!data) {
      return;
    }

    this.changeData  = data;
    let timeStart = 0;
    let timeEnd = 0;


    switch (this.changeData.changeOrigin) {
      case OperationChangeOriginEnum.ContainerGrid:
      case OperationChangeOriginEnum.ItemGrid: {
        const operation = data.operation as PlanGridOperation;
        timeEnd = new Date(operation.timeEnd).getTime();
        timeStart = new Date(operation.timeStart).getTime();
        break;
      }
      case OperationChangeOriginEnum.InfoDialog: {
        const operation = data.operation as PlannedEventSimple;
        if (operation.timeStartPreparation && operation.timeEnd) {
          timeEnd = new Date(operation.timeEnd).getTime();
          timeStart = new Date(operation.timeStartPreparation).getTime();
        }
        break;
      }
    }

    if (timeEnd < timeStart) {
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
    { id: 1, text: 'Spremeni trajanje operacije' },
    { id: 2, text: 'Prestavi - ohrani trajanje operacije' },
  ];
  planItemChangeOptions: {id: number, text: string}[] = [];

  itemChangeOptions = [
    { id: 1, text: 'Pripni nadaljne operacije' },
    { id: 2, text: 'Ohrani nadaljne operacije' }
  ];

  constructor(private store: Store<AppState>) {
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);

    this.form = new FormGroup({
      planItemChange: new FormControl(1),
      itemChange: new FormControl(true),
    });
  }

  onSubmit() {
    this.changeData.operation.options = {
      snapFurtherItems: this.form.value.itemChange
    };

    if (this.form.value.planItemChange === 2) {
      const diff = new Date(this.changeData.oldTimeEnd).getTime() - new Date(this.changeData.oldTimeStart).getTime();
      if (this.changeData.timeChange.timeEnd) {
        switch (this.changeData.changeOrigin) {
          case OperationChangeOriginEnum.ContainerGrid:
          case OperationChangeOriginEnum.ItemGrid: {
            const operation = this.changeData.operation as PlanGridOperation;
            operation.timeStart = new Date(new Date(operation.timeEnd).getTime() - diff);
            break;
          }
          case OperationChangeOriginEnum.InfoDialog: {
            const operation = this.changeData.operation as PlannedEventSimple;
            if (operation.timeEnd) {
              operation.timeStartPreparation = new Date(new Date(operation.timeEnd).getTime() - diff);
            }
            break;
          }
        }
      } else if (this.changeData.timeChange.timeStart) {
        switch (this.changeData.changeOrigin) {
          case OperationChangeOriginEnum.ContainerGrid:
          case OperationChangeOriginEnum.ItemGrid: {
            const operation = this.changeData.operation as PlanGridOperation;
            operation.timeEnd = new Date(new Date(operation.timeStart).getTime() + diff);
            break;
          }
          case OperationChangeOriginEnum.InfoDialog: {
            const operation = this.changeData.operation as PlannedEventSimple;
            if (operation.timeStartPreparation) {
              operation.timeEnd = new Date(new Date(operation.timeStartPreparation).getTime() + diff);
            }
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

  // initForm() {
  //   this.form = new FormGroup({
  //   })
  // }

  // updateForm() {
  //   if (!this.change) { return; }

  // }

}
