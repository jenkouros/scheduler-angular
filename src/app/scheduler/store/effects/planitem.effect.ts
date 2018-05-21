import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as fromActions from '../actions';
import { map, tap } from 'rxjs/operators';
// import { PlanItemsService } from '../../services';
import { PlanItemServer } from '../../models/server/planitem.servermodel';
import { Store } from '@ngrx/store';
// import { PlanItemState } from '../reducers';
import { PlanItem } from '../../models/planitem.dto';
import { SchedulerState } from '../reducers';
import { PlanItemsService } from '../../services/planitems.service';

@Injectable()
export class PlanItemEffects {
    constructor(
        private actions$: Actions,
        private planItemService: PlanItemsService,
        private store: Store<SchedulerState>
    ) {}

    @Effect()
    loadPlanItems$ = this.actions$.ofType(fromActions.LOAD_PLANITEMS)
    .pipe(
       map(action => {
            const store = this.planItemService.getPlanItemsStore();
            store.on('loaded', (data: PlanItemServer[]) =>
                this.store.dispatch(new fromActions.LoadPlanItemsSuccess( data.map(i => PlanItem.fromServer(i)) ))
            );
            return new fromActions.RegisterPlanItemStore(store);
       })
    );
}
