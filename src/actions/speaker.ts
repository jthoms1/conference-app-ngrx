import { Action } from '@ngrx/store';
import { Speaker } from '../models/speaker';

export const SEARCH =                  '[Speaker] Search';
export const SEARCH_COMPLETE =         '[Speaker] Search Complete';
export const LOAD =                    '[Speaker] Load';
export const SELECT =                  '[Speaker] Select';
export const LOAD_COLLECTION =         '[Speaker] Load';
export const LOAD_COLLECTION_SUCCESS = '[Speaker] Load Success';
export const LOAD_COLLECTION_FAIL =    '[Speaker] Load Fail';

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class SearchAction implements Action {
  readonly type = SEARCH;

  constructor(public payload: string) { }
}

export class SearchCompleteAction implements Action {
  readonly type = SEARCH_COMPLETE;

  constructor(public payload: Speaker[]) { }
}

export class LoadAction implements Action {
  readonly type = LOAD;

  constructor(public payload: Speaker) { }
}

export class SelectAction implements Action {
  readonly type = SELECT;

  constructor(public payload: string) { }
}

/**
 * Load Collection Actions
 */
export class LoadCollectionAction implements Action {
  readonly type = LOAD_COLLECTION;
}

export class LoadCollectionSuccessAction implements Action {
  readonly type = LOAD_COLLECTION_SUCCESS;

  constructor(public payload: Speaker[]) { }
}

export class LoadCollectionFailAction implements Action {
  readonly type = LOAD_COLLECTION_FAIL;

  constructor(public payload: any) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = SearchAction
  | SearchCompleteAction
  | LoadAction
  | SelectAction
  | LoadCollectionAction
  | LoadCollectionSuccessAction
  | LoadCollectionFailAction;
