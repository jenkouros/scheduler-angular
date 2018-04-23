import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as fromActions from '../actions';
import { map, tap } from 'rxjs/operators';
import { PlanItemsService } from '../../services';
import { PlanItem } from '../../models/planitem.model';
import { Store } from '@ngrx/store';
import { PlanItemState } from '../reducers';

@Injectable()
export class PlanItemEffects {
    constructor(
        private actions$: Actions,
        private planItemService: PlanItemsService,
        private store: Store<PlanItemState>
    ) {}

    @Effect()
    loadPlanItems$ = this.actions$.ofType(fromActions.LOAD_PLANITEMS)
    .pipe(
       map(action => {
            const store = this.planItemService.getPlanItemsStore();
            store.on('loaded', (data: PlanItem[]) => this.store.dispatch(new fromActions.LoadPlanItemsSuccess(data)));
            return new fromActions.RegisterPlanItemStore(store);
       })
    );
}
