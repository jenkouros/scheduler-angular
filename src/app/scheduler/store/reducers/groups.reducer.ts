import { GroupFilter, GroupFilterViewModel } from '../../models/groupfilter.dto';
import { Filter } from '../../models/filter.dto';
import * as fromActions from '../actions/groups.action';
import { Container } from '../../models/container.dto';
import { FilterValueSelect, FilterSelect } from '../../models/filter.viewmodel';
import { ContainerSelect } from '../../models/container.viewModel';

export interface GroupState {
    groups: GroupFilter[] | null;
    filters: Filter[] | null;
    containers: Container[] | null;
    groupEdit: GroupEditState | null;
}

export interface GroupEditState {
    id: number;
    name: string;
    type: string;
    containers: ContainerSelect[];
    filters: FilterSelect[];
}

export const initialState: GroupState = {
    groups: null,
    filters: null,
    containers: null,
    groupEdit: null
};

export function groupsReducer(state: GroupState, action: fromActions.GroupActions): GroupState {
    switch (action.type) {
        case fromActions.LOAD_GROUP_CODELIST_FILTER_SUCCESS: {
            return {
                ...state,
                filters: action.payload
            };
        }
        case fromActions.LOAD_GROUPS_SUCCESS: {
            return {
                ...state,
                groups: action.payload
            };
        }
        case fromActions.LOAD_GROUP_CODELIST_CONTAINER_SUCCESS: {
            return {
                ...state,
                containers: action.payload
            };
        }
        case fromActions.SET_GROUP_EDIT: {
            const edit: GroupEditState | null = action.payload !== null
                ? {
                    id: action.payload.id,
                    name: action.payload.name,
                    type: action.payload.type,
                    containers: action.payload.containerSelects,
                    filters: action.payload.filterSelects }
                : null;
            return {
                ...state,
                groupEdit: edit
            };
        }
        case fromActions.CHANGE_EDIT_GROUP_FILTER: {
            if (state.groupEdit) {

                const updatedFilterSelects = [...state.groupEdit.filters];
                const changedFilterIdx = updatedFilterSelects.findIndex(i => i.id === action.payload.idFilter);
                if (changedFilterIdx > -1) {
                    const values = updatedFilterSelects[changedFilterIdx].valuesSelect.map(vs => {
                        const idx = action.payload.idValues.indexOf(vs.id);
                        if (idx > -1 && !vs.selected || idx < 0 && vs.selected) {
                            return Object.assign(new FilterValueSelect(), vs, { selected: !vs.selected });
                        }
                        return vs;
                    });
                    updatedFilterSelects[changedFilterIdx] = Object.assign(
                        new FilterSelect(),
                        updatedFilterSelects[changedFilterIdx],
                        { valuesSelect: values });
                }

                return {
                    ...state,
                    groupEdit: {
                        ...state.groupEdit,
                        filters: updatedFilterSelects
                    }
                };
            }
            return state;
        }
        case fromActions.CHANGE_EDIT_GROUP_CONTAINER_FILTER: {
            if (state.groupEdit) {
                const containerSelects = state.groupEdit.containers.map(c => {
                    const idx = action.payload.indexOf(c.id);
                    if (idx > -1 && !c.selected || idx < 0 && c.selected) {
                        return Object.assign(new ContainerSelect(), c, { selected: !c.selected });
                    }
                    return c;
                });
                return {
                    ...state,
                    groupEdit: {
                        ...state.groupEdit,
                        containers : containerSelects
                    }
                };

            }
            return state;
        }

        default: {
            return state;
        }
    }
}
