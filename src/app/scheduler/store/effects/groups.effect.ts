import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { GroupsService } from '../../services/groups.service';
import * as fromActions from '../actions/groups.action';
import { switchMap, map, mergeMap } from 'rxjs/operators';
import { FiltersService } from '../../services/filters.service';
import { ContainersService, NotifyService } from '../../services';
import { AppComponentBase } from '../../../shared/app-component-base';


@Injectable()
export class GroupsEffects extends AppComponentBase {
    constructor(
        private actions$: Actions,
        private groupsService: GroupsService,
        private filterService: FiltersService,
        private containerService: ContainersService,
        private notifyService: NotifyService
    ) {
        super();
    }

    @Effect()
    loadGroups$ = this.actions$.ofType(fromActions.LOAD_GROUPS)
        .pipe(
            switchMap(_ => {
                return this.groupsService.getGroups()
                    .pipe(
                        map(response => new fromActions.LoadGroupsSuccess(response))
                    );
            })
        );

    @Effect()
    loadFilters$ = this.actions$.ofType(fromActions.LOAD_GROUP_CODELIST_FILTER)
        .pipe(
            switchMap(_ => {
                return this.filterService.getFilters()
                    .pipe(
                        map(response => new fromActions.LoadGroupCodelistFilterSuccess(response))
                    );
            })
        );

    @Effect()
    loadContainers$ = this.actions$.ofType(fromActions.LOAD_GROUP_CODELIST_CONTAINER)
        .pipe(
            switchMap(_ => {
                return this.containerService.getContainers()
                    .pipe(
                        map(response => new fromActions.LoadGroupCodeListContainerSuccess(response))
                    );
            })
        );

    @Effect()
    updateFilterGroup$ = this.actions$.ofType(fromActions.UPDATE_GROUP)
        .pipe(
            switchMap((action: fromActions.UpdateGroup) => {
                return this.groupsService.updateGroup(action.payload)
                    .pipe(
                        mergeMap(response => [new fromActions.LoadGroups(), new fromActions.SetEditGroup(null)] )
                    );
            })
        );

    @Effect()
    setDefaultGroup$ = this.actions$.ofType(fromActions.SET_DEFAULT_GROUP)
        .pipe(
            switchMap((action: fromActions.SetDefaultGroup) => {
                return this.groupsService.setGroup(action.payload)
                    .pipe(
                        map(response => {
                          if (response) {
                            this.notifyService.notifySuccess(this.translate('Save_Group_Success'));
                            return new fromActions.SetDefaultGroupSuccess(response);
                          } else {
                            this.notifyService.notifyError(this.translate('Save_Group_Failure'));
                            return new fromActions.SetDefaultGroupSuccess(response);
                          }
                        })
                    );
            })
        );

}
