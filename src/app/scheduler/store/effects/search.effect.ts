import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import * as fromAction from '../actions';
import { map } from 'rxjs/operators';
import { SearchService } from '../../services/search.service';
import { Effect } from '@ngrx/effects';

@Injectable()
export class SearchEffects {
    constructor(private actions$: Actions, private searchService: SearchService) {}

    @Effect()
    getSearchItemStore$ = this.actions$.ofType(fromAction.GET_SEARCHITEMS_STORE)
        .pipe(
            map((action: fromAction.GetSearchItemsStore) => action.payload),
            map(search => {
                return new fromAction.GetSearchItemsStoreSuccess(
                    this.searchService.getSearchItemsStore(search)
                );
            })
        );

    @Effect()
    searchItemStore$ = this.actions$.ofType(fromAction.SEARCH_SEARCHITEMS_STORE)
        .pipe(
            map((action: fromAction.SearchItemsStore) => action.payload),
            map(search => new fromAction.GetSearchItemsStore(search))
        );

    @Effect()
    getSearchPlanItemStore$ = this.actions$.ofType(fromAction.GET_SEARCHPLANITEMS_STORE)
        .pipe(
            map((action: fromAction.GetSearchPlanItemsStore) => action.payload),
            map(search => {
                return new fromAction.GetSearchPlanItemsStoreSuccess(
                    this.searchService.getSearchPlanItemsStore(search)
                );
            })
        );

    @Effect()
    searchPlanItemStore$ = this.actions$.ofType(fromAction.SEARCH_SEARCHPLANITEMS_STORE)
        .pipe(
            map((action: fromAction.SearchPlanItemsStore) => action.payload),
            map(search => new fromAction.GetSearchPlanItemsStore(search))
        );
}
