import { ActionReducer } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers } from '@ngrx/store';

import * as fromSessions from './sessions';
import * as fromSpeakers from './speakers';
import * as fromLocations from './locations';


/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
  sessions: fromSessions.State;
  speakers: fromSpeakers.State;
  locations: fromLocations.State;
}