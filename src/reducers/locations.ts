import { createSelector } from 'reselect';
import { Location } from '../models/location';
import * as location from '../actions/location';
import * as collection from '../actions/collection';


export interface State {
  ids: Location['id'][];
  entities: { [id: string]: Location};
  selectedLocationId?: string
}

export const initialState: State = {
  ids: [],
  entities: {},
  selectedLocationId: null,
};

export function reducer(state = initialState, action: location.Actions | collection.Actions): State {
  switch (action.type) {
    case location.SEARCH_COMPLETE:
    case collection.LOAD_SUCCESS: {
      const locations = action.payload;
      const newLocations = locations.filter((location: Location) => !state.entities[location.id]);

      const newLocationIds = newLocations.map((location: Location) => location.id);
      const newLocationEntities = newLocations.reduce((entities: State['entities'], location: Location) => {
        return {
          ...entities,
          [location.id]: location
        };
      }, <State['entities']>{});

      return {
        ...state,
        ids: [ ...state.ids, ...newLocationIds ],
        entities: {
          ...state.entities,
          ...newLocationEntities
        },
      };
    }

    case location.LOAD: {
      const location = action.payload;

      if (state.ids.includes(location.id)) {
        return state;
      }

      return {
        ...state,
        ids: [ ...state.ids, location.id ],
        entities: {
          ...state.entities,
          [location.id]: location
        }
      };
    }

    case location.SELECT: {
      return {
        ...state,
        selectedLocationId: action.payload
      };
    }

    default: {
      return state;
    }
  }
}

/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */

export const getEntities = (state: State) => state.entities;

export const getIds = (state: State) => state.ids;

export const getSelectedId = (state: State) => state.selectedLocationId;

export const getSelected = createSelector(
  getEntities,
  getSelectedId,
  (entities: State['entities'], selectedId: string) => entities[selectedId]
);

export const getAll = createSelector(getEntities, getIds, (entities: State['entities'] , ids: State['ids']) => {
  return ids.map((id: string) => entities[id]);
});
