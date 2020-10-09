import { Action } from '@ngrx/store';

export const LOADER_SHOW = '[Application] LOADER_SHOW';
export const LOADER_HIDE = '[Application] LOADER_HIDE';

export class LoaderShow implements Action {
  readonly type = LOADER_SHOW;
}

export class LoaderHide implements Action {
  readonly type = LOADER_HIDE;
}

export type ApplicationActions =
  | LoaderShow
  | LoaderHide;
