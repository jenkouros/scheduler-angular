import { Action } from '@ngrx/store';
import { Container } from '../../../scheduler/models/container.dto';
import { Schedule } from '../../models/timetable.model';
import { SubCalendar, SelectedContainers } from '../../models/calendar.model';

// selected containers
export const LOAD_CONTAINERS = '[WorkTime] Load Selected Containers';
export const LOAD_CONTAINERS_SUCCESS =
  '[WorkTime] Load Selected Containers Success';
export const LOAD_CONTAINERS_FAIL = '[WorkTime] Load Selected Containers Fail';

export class LoadContainers implements Action {
  readonly type = LOAD_CONTAINERS;
}

export class LoadContainersSuccess implements Action {
  readonly type = LOAD_CONTAINERS_SUCCESS;
  constructor(public payload: Schedule) {}
}

export class LoadContainersFail implements Action {
  readonly type = LOAD_CONTAINERS_FAIL;
  constructor(public payload: any) {}
}

// add to selected
export const ADD_TO_SELECTED_CONTAINERS =
  '[WorkTime] Add To Selected Containers';
export const ADD_TO_SELECTED_CONTAINERS_SUCCESS =
  '[WorkTime] Add To Selected Containers Success';
export const ADD_TO_SELECTED_CONTAINERS_FAIL =
  '[WorkTime] Add To Selected Containers Fail';

export class AddToSelectedContainers implements Action {
  readonly type = ADD_TO_SELECTED_CONTAINERS;
  constructor(public payload: SelectedContainers) {}
}
export class AddToSelectedContainersSuccess implements Action {
  readonly type = ADD_TO_SELECTED_CONTAINERS_SUCCESS;
  constructor(public payload: SelectedContainers) {}
}
export class AddToSelectedContainersFail implements Action {
  readonly type = ADD_TO_SELECTED_CONTAINERS_FAIL;
  constructor(public payload: any) {}
}

// remove from selected
export const REMOVE_FROM_SELECTED_CONTAINERS =
  '[WorkTime] Remove From Selected Containers';
export const REMOVE_FROM_SELECTED_CONTAINERS_SUCCESS =
  '[WorkTime] Remove From Selected Containers Success';
export const REMOVE_FROM_SELECTED_CONTAINERS_FAIL =
  '[WorkTime] Remove From Selected Containers Fail';

export class RemoveFromSelectedContainers implements Action {
  readonly type = REMOVE_FROM_SELECTED_CONTAINERS;
  constructor(public payload: SelectedContainers) {}
}
export class RemoveFromSelectedContainersSuccess implements Action {
  readonly type = REMOVE_FROM_SELECTED_CONTAINERS_SUCCESS;
  constructor(public payload: SelectedContainers) {}
}
export class RemoveFromSelectedContainersFail implements Action {
  readonly type = REMOVE_FROM_SELECTED_CONTAINERS_FAIL;
  constructor(public payload: any) {}
}

export type ContainersActions =
  | LoadContainers
  | LoadContainersSuccess
  | LoadContainersFail
  | AddToSelectedContainers
  | AddToSelectedContainersSuccess
  | AddToSelectedContainersFail
  | RemoveFromSelectedContainers
  | RemoveFromSelectedContainersSuccess
  | RemoveFromSelectedContainersFail;
