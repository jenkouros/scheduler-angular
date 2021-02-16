import { Store, select } from '@ngrx/store';
import { Injectable } from '@angular/core';
import * as ContainerSelectors from '../selectors/containers.selectors';
import { AppState } from './../../../store/app.reducers';
import * as ContainersAction from '../actions/containers.action';

@Injectable()
export class ContainerFacade {
    public containerStatuses$ = this.store.pipe(select(ContainerSelectors.getStatuses));

    constructor(private store: Store<AppState>) {}

    loadContainerStatuses() {
        this.store.dispatch(new ContainersAction.LoadContainerStatuses());
    }

    updateContainerStatus(idContainer: number, idContainerStatus: number) {
        this.store.dispatch(new ContainersAction.UpdateContainer({idContainer: idContainer, idContainerStatus: idContainerStatus}));
    }
}
