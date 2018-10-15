import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store';
import { Observable, Subscription } from 'rxjs';
import { GroupFilter, GroupFilterViewModel } from '../../models/groupfilter.dto';
import { Filter } from '../../models/filter.dto';
import { FilterSelect } from '../../models/filter.viewmodel';
import { Container } from '../../models/container.dto';

@Component({
    selector: 'app-group-index',
    template: `
        <app-group-list
            (groupFilterSelected) = "onGroupFilterSelected($event)"
            (editGroupFilter)="onEditGroupFilter($event)"
            (createGroupFilter)="onCreateGroupFilter()"
            [groups]="groups$ | async">
        </app-group-list>
        <app-group-edit
            [groupFilter]="editGroupFilter$ | async"
            (applyEditGroupFilter)="onApplyEditGroupFilter($event)"
            (cancelEditGroupFilter)="onCancelEditGroupFilter()"
            (changeEditGroupFilter)="onChangeEditGroupFilter($event.idFilter, $event.idValues)"
            (changeEditGroupContainerFilter)="onChangeEditGroupContainerFilter($event)">
        </app-group-edit>
    `
})
export class GroupIndexComponent implements OnInit, OnDestroy {
    groups$: Observable<GroupFilterViewModel[] | null>;
    editGroupFilter$: Observable<GroupFilterViewModel | null>;
    filterCodeList: Filter[] | null;
    containerCodeList: Container[] | null;

    filterCodeListSubscription: Subscription;
    containerCodeListSubscription: Subscription;

    constructor(private store: Store<fromStore.SchedulerState>) {}

    ngOnInit() {
        this.store.dispatch(new fromStore.LoadGroupCodelistFilter());
        this.store.dispatch(new fromStore.LoadGroupCodeListContainer());
        this.store.dispatch(new fromStore.LoadGroups());
        this.groups$ = this.store.pipe(
            select(fromStore.selectGroupViewModelList)
        );

        this.editGroupFilter$ = this.store.pipe(
            select(fromStore.selectEditGroupFilter)
        );

        this.filterCodeListSubscription = this.store.pipe(
            select(fromStore.selectGroupCodeListFilter)
        ).subscribe(i => this.filterCodeList = i);

        this.containerCodeListSubscription = this.store.pipe(
            select(fromStore.selectGroupCodeListContainer)
        ).subscribe(i => this.containerCodeList = i);
    }

    onGroupFilterSelected(data: GroupFilterViewModel) {
        const dict: {[id: number]: number[]} = {};
        data.filtersWithSelectedValue.forEach(f => {
            dict[f.id] = f.selectedValues.map(fv => fv.id);
        });

        this.store.dispatch(new fromStore.ChangeContainersFilter(data.selectedContainers));
        this.store.dispatch(new fromStore.ChangeFilter(dict));
    }

    onEditGroupFilter(data: GroupFilterViewModel | null) {
        this.store.dispatch(new fromStore.SetEditGroup(data));
    }

    onCreateGroupFilter() {
        if (!this.containerCodeList || !this.filterCodeList) { return; }
        const model = GroupFilterViewModel.create(new GroupFilter,
            this.filterCodeList, this.containerCodeList);
        model.type = 'user';
        this.onEditGroupFilter(model);
    }

    onApplyEditGroupFilter(data: GroupFilterViewModel) {
        this.store.dispatch(new fromStore.UpdateGroup(data));
    }
    onCancelEditGroupFilter() {
        this.store.dispatch(new fromStore.SetEditGroup(null));
    }
    onChangeEditGroupFilter(idFilter: number, idValues: number[]) {
        this.store.dispatch(new fromStore.ChangeEditGroupFilter({ idFilter, idValues }));
    }

    onChangeEditGroupContainerFilter(idContainers: number[]) {
        this.store.dispatch(new fromStore.ChangeEditGroupContainerFilter(idContainers));
    }

    ngOnDestroy() {
        if (this.containerCodeListSubscription) {
            this.containerCodeListSubscription.unsubscribe();
        }
        if (this.filterCodeListSubscription) {
            this.filterCodeListSubscription.unsubscribe();
        }
    }

}
