import { ApplicationState } from './application.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const selectApplicationState = createFeatureSelector<ApplicationState>('application');

export const selectLoader = createSelector(
  selectApplicationState,
  state => state.loading
);
