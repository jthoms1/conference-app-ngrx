import { Action } from '@ngrx/store';
import { Speaker } from '../models/speaker';

export const LOAD =                 '[Collection] Load';
export const LOAD_SUCCESS =         '[Collection] Load Success';
export const LOAD_FAIL =            '[Collection] Load Fail';


/**
 * Load Collection Actions
 */
export class LoadAction implements Action {
  readonly type = LOAD;
}

export class LoadSuccessAction implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: Speaker[]) { }
}

export class LoadFailAction implements Action {
  readonly type = LOAD_FAIL;

  constructor(public payload: any) { }
}


export type Actions =
  | LoadAction
  | LoadSuccessAction
  | LoadFailAction;
