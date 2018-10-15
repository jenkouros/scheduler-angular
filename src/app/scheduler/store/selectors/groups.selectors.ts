import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import { GroupFilterViewModel, GroupFilter } from '../../models/groupfilter.dto';
import { getFilterCodeList } from './filters.selectors';
import { Filter } from '../../models/filter.dto';
import { FilterSelect } from '../../models/filter.viewmodel';
import { ContainerSelect } from '../../models/container.viewModel';

export const getGroupsState = createSelector(
    fromFeature.getSchedulerState,
    (state: fromFeature.SchedulerState) => state.groups
);

const selectGroupFilters = createSelector(
    getGroupsState,
    state => state.groups
);

const selectEditGroupState = createSelector(
    getGroupsState,
    state => state.groupEdit
);

export const selectGroupCodeListFilter = createSelector(
    getGroupsState,
    (state: fromFeature.GroupState) => state.filters
);

export const selectGroupCodeListContainer = createSelector(
    getGroupsState,
    (state: fromFeature.GroupState) => state.containers
);

export const selectEditGroupFilter = createSelector(
    selectEditGroupState,
    selectGroupCodeListFilter,
    selectGroupCodeListContainer,
    (state) => {
        if (!state) { return null; }
        const result = new GroupFilterViewModel();
        result.id = state.id;
        result.name = state.name;
        result.type = state.type;
        result.containerSelects = state.containers;
        result.filterSelects = state.filters;
        return result;
    }
);



export const selectGroupViewModelList = createSelector(
    selectGroupFilters,
    selectGroupCodeListFilter,
    selectGroupCodeListContainer,
    (groups, filters, containers) => {
        if (groups && filters && containers) {
            return groups.map(group =>
                GroupFilterViewModel.create(group, filters, containers));
        }
        return null;
    }
);
