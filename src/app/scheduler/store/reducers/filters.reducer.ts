import { Filter } from "../../models/filter.model";
import * as fromFilters from '../actions/filters.action';

export interface FilterState {
    entities: Filter[];
    selectedEntities: { [id: string]: number[] };
    loading: boolean;
    loaded: boolean;
}

export const initialState: FilterState = {
    entities: [],
    selectedEntities: {},
    loaded: false,
    loading: false
};

export function filtersReducer(
    state = initialState, 
    action: fromFilters.filterActions) 
{
    switch(action.type) {
        case fromFilters.LOAD_FILTERS: {
            return {
                ...state,
                loading: true
            };
        }
        case fromFilters.LOAD_FILTERS_FAIL: {
            return {
                ...state,
                loaded: false,
                loading: false
            };
        }
        case fromFilters.LOAD_FILTERS_SUCCESS: {
            const filters = [...action.payload];
            return {
                ...state,
                loaded: true,
                loading: false,
                entities: filters
            };
        }
        case fromFilters.CHANGE_FILTER: {
            let selected = {...state.selectedEntities};
            for(let key in action.payload) {
                selected[key] = [...action.payload[key]];
            }

            let entities = state.entities.map(entity => {
                let values = entity.values.map(value => {
                    return {
                        ...value,
                        selected: (selected[entity.id] && selected[entity.id].indexOf(value.id) > -1)
                    }
                });

                return {
                    ...entity,
                    values: values
                };
            });

            return {
                ...state,
                selectedEntities: selected,
                entities: entities
            };
        }
        case fromFilters.SELECT_VALUE_ON_FILTER: {
            let selected = { ...state.selectedEntities };
            if(selected[action.payload.id]) {
                selected[action.payload.id] = [...selected[action.payload.id], action.payload.value];
            } else {
                selected[action.payload.id] = [action.payload.value]
            }

            let updateEntityIndex = state.entities.findIndex(x => x.id === action.payload.id);
            let valueIndex = state.entities[updateEntityIndex].values.findIndex(x => x.id === action.payload.value);
            if(updateEntityIndex > -1 && valueIndex > -1) {
                let updateValue = {
                    ...state.entities[updateEntityIndex].values[valueIndex], 
                    selected: true
                };

                let updateEntity = {
                    ...state.entities[updateEntityIndex]
                };

                updateEntity.values[valueIndex] = updateValue

                let updatedEntities = [
                    ...state.entities
                ];

                updatedEntities[updateEntityIndex] = updateEntity;

                return {
                    ...state,
                    entities: updatedEntities,
                    selectedEntities: selected
                };
            }

            return {
                ...state                
            }
        }
        case fromFilters.REMOVE_VALUE_ON_FILTER: {
            let selected = { ...state.selectedEntities };
            if(selected[action.payload.id]) {
                let selectedIndex = selected[action.payload.id].findIndex(x => x === action.payload.value);
                if(selected[action.payload.id].length == 1) {
                    delete selected[action.payload.id];
                } else {
                    selected[action.payload.id].splice(selectedIndex, 1);
                }
            }

            let updateEntityIndex = state.entities.findIndex(x => x.id === action.payload.id);
            let valueIndex = state.entities[updateEntityIndex].values.findIndex(x => x.id === action.payload.value);
            if(updateEntityIndex > -1 && valueIndex > -1) {
                let updateValue = {
                    ...state.entities[updateEntityIndex].values[valueIndex], 
                    selected: false
                };

                let updateEntity = {
                    ...state.entities[updateEntityIndex]
                };

                updateEntity.values[valueIndex] = updateValue

                let updatedEntities = [
                    ...state.entities
                ];

                updatedEntities[updateEntityIndex] = updateEntity;

                return {
                    ...state,
                    entities: updatedEntities,
                    selectedEntities: selected
                };
            }
        }
    }

}