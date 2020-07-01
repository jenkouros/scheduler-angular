import { ContainerSelect } from './../../../../models/container.viewmodel';
import { PlanItemGrid } from './../../../../models/plan-item-grid-model';
import { Observable } from 'rxjs';
import { Component, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../../store/app.reducers';
import * as PlanItemGridSelectors from '../../../../store/selectors/plan-item-grid.selectors';
import * as PlanItemGridActions from '../../../../store/actions/plan-item-grid.action';
import { AppComponentBase } from '../../../../../shared/app-component-base';

@Component({
  selector: 'app-plan-item-grid-dialog',
  templateUrl: './plan-item-grid-dialog.component.html'
})
export class PlanItemGridDialogComponent extends AppComponentBase {
  planItemGrid$: Observable<PlanItemGrid | undefined>;
  @Input() containers: ContainerSelect[];

  constructor(private store: Store<AppState>) {
    super();
    this.closeDialog = this.closeDialog.bind(this);
    this.planItemGrid$ = this.store.pipe(select(PlanItemGridSelectors.getPlanGridItemDialogData));
  }

  closeDialog() {
    this.store.dispatch(new PlanItemGridActions.ClearPlanItemGridWithId());
  }
}
