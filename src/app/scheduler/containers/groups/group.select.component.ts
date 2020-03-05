import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store';
import { GroupSelectorViewModel } from '../../models/groupfilter.dto';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-group-select',
    template: `
    <app-group-selector [groups]="groups$ | async" (selected)="selected($event)">
    </app-group-selector>
    `
})
export class GroupSelectComponent implements OnInit {
    groups$: Observable<GroupSelectorViewModel[] | null>;
    constructor(private store: Store<fromStore.SchedulerState>) {}

    ngOnInit() {
        this.store.dispatch(new fromStore.LoadGroups());
        this.groups$ = this.store.pipe(
            select(fromStore.selectGroupSelectorViewModel)
        );
    }

    selected(data: GroupSelectorViewModel | null) {
        this.store.dispatch(new fromStore.SetDefaultGroup(data != null ? data.id : null));
    }
}
