import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import * as fromAction from '../actions';
import { map, withLatestFrom } from 'rxjs/operators';
import { SearchService } from '../../services/search.service';
import { Effect } from '@ngrx/effects';
import { AppState } from '../../../store/app.reducers';
import { Store } from '@ngrx/store';

@Injectable()
export class SearchEffects {
  constructor(
    private actions$: Actions,
    private searchService: SearchService,
    private store: Store<AppState>
  ) {}

  @Effect()
  getSearchItemStore$ = this.actions$.ofType(fromAction.GET_SEARCHITEMS_STORE).pipe(
    map((action: fromAction.GetSearchItemsStore) => action.payload),
    withLatestFrom(this.store.select(state => state.plan.items.selectedId)),
    map(([search, idPlan]) => {
      return new fromAction.GetSearchItemsStoreSuccess(
        this.searchService.getSearchItemsStoreConfiguration(idPlan, search)
      );
    })
  );

  @Effect()
  searchItemStore$ = this.actions$.ofType(fromAction.SEARCH_SEARCHITEMS_STORE).pipe(
    map((action: fromAction.SearchItemsStore) => action.payload),
    map(search => new fromAction.GetSearchItemsStore(search))
  );

  @Effect()
  getSearchPlanItemStore$ = this.actions$.ofType(fromAction.GET_SEARCHPLANITEMS_STORE).pipe(
    map((action: fromAction.GetSearchPlanItemsStore) => action.payload),
    withLatestFrom(this.store.select(state => state.plan.items.selectedId)),
    map(([search, idPlan]) => {
      return new fromAction.GetSearchPlanItemsStoreSuccess(
        this.searchService.getSearchPlanItemsStoreConfiguration(idPlan, search)
      );
    })
  );

  @Effect()
  searchPlanItemStore$ = this.actions$.ofType(fromAction.SEARCH_SEARCHPLANITEMS_STORE).pipe(
    map((action: fromAction.SearchPlanItemsStore) => action.payload),
    map(search => new fromAction.GetSearchPlanItemsStore(search))
  );
}
