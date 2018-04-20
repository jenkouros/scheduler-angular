import * as fromActions from '../actions/planitems.action';
import * as fromPlanItems from './planitems.reducer';
import { PlanItem } from '../../models/planitem.model';
import { PaginationResponse } from '../../../shared/shared.model';

describe('PlanItemsReducer', () => {
    describe('Undefined action', () => {
        it('should return the default state', () => {
            const { initialState } = fromPlanItems;
            const action = {};
            const state = fromPlanItems.planItemsReducer(undefined, <any>action);
            expect(state).toBe(initialState);
        });
    });

    describe('LOAD_PLANITEMS action', () => {
        it('should set loading to true', () => {
            const { initialState } = fromPlanItems;
            const action = new fromActions.LoadPlanItems();
            const state = fromPlanItems.planItemsReducer(initialState, action);
            expect(state.itemsLoaded).toEqual(false);
            expect(state.itemsLoading).toEqual(true);
            expect(state.items).toEqual([]);
        });
    });

    describe('LOAD_PLANITEMS_FAIL action', () => {
        it('should set loaded to false', () => {
            const { initialState } = fromPlanItems;
            const previousState = {...initialState, loading: true};
            const action = new fromActions.LoadPlanItemsFail(<any>{});
            const state = fromPlanItems.planItemsReducer(previousState, action);
            expect(state).toEqual(initialState);
        });
    });

    describe('LOAD_PLANITEMS_SUCCESS action', () => {
        it('should set loaded to true', () => {
            const response: PlanItem[] = [PLAN_ITEM];

            const { initialState } = fromPlanItems;
            const previousState = {...initialState, loading: true};


            const action = new fromActions.LoadPlanItemsSuccess(response);
            const state = fromPlanItems.planItemsReducer(previousState, action);
            expect(state.itemsLoaded).toEqual(true);
            expect(state.itemsLoading).toEqual(false);
            expect(state).toEqual(response);
        });
    });
});

const PLAN_ITEM: PlanItem = {
    'id': 1,
    'code': '100000',
    'quantity': 1000,
    'quantityBatch': 100,
    'quantityPlanned': 0,
    'measurementUnit': {
        'name': 'kilogram',
        'code': 'kg'
    },
    'product': {
        'id': 52000,
        'code': '701233',
        'name': 'Bencin D40'
    },
    'limitDateFrom': new Date(),
    'limitDateTo': new Date()
};
