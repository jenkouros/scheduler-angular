import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store';
import { Router, ActivatedRoute } from '@angular/router';
import { GridStoreConfiguration } from '../../models/shared.dto';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-searcher',
    template: `
        <app-search
            (search)="onSearch($event)"
            (openPlanItemInScheduler)="onOpenInScheduler($event)"
            [searchItemStoreConfiguration]="searchItemStoreConfiguration$ | async"
            [searchPlanItemStoreConfiguration]="searchPlanItemStoreConfiguration$ | async">
        </app-search>
    `
})
export class SearcherComponent implements OnInit {
    // searchItemStore$: Observable<CustomStore | null>;
    // searchPlanItemStore$: Observable<CustomStore | null>;
    searchItemStoreConfiguration$: Observable<GridStoreConfiguration | null>;
    searchPlanItemStoreConfiguration$: Observable<GridStoreConfiguration | null>;
    constructor(private store: Store<fromStore.SchedulerState>,
        private router: Router,
        private route: ActivatedRoute) {}

    ngOnInit() {
        this.store.dispatch(new fromStore.GetSearchItemsStore(''));
        this.store.dispatch(new fromStore.GetSearchPlanItemsStore(''));
        this.searchItemStoreConfiguration$ = this.store.pipe(select(fromStore.selectSearchItemStoreConfiguration));
        this.searchPlanItemStoreConfiguration$ = this.store.pipe(select(fromStore.selectSearchPlanItemStoreConfiguration));
    }

    onSearch(search: string) {
        this.store.dispatch(new fromStore.SearchItemsStore(search));
        this.store.dispatch(new fromStore.SearchPlanItemsStore(search));
    }

    onOpenInScheduler(data: { dateStart: Date, idContainer: number}) {
        this.store.dispatch(new fromStore.SetSchedulerCurrentDate(data.dateStart));
        this.store.dispatch(new fromStore.ReselectContainers([data.idContainer]));

        const startDate = new Date(data.dateStart);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 1);

        this.store.dispatch(new fromStore.LoadEvents({
            containerIds: [data.idContainer],
            dateFrom: startDate,
            dateTo: endDate
        }));
        this.router.navigate(['/scheduler/planner']);
    }
}
