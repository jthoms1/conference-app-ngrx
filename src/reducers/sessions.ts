import { createSelector } from 'reselect';
import { Session } from '../models/session';
import * as session from '../actions/session';
import * as collection from '../actions/collection';


export interface State {
  ids: Session['id'][];
  entities: { [id: string]: Session};
  selectedSessionId?: string
}

export const initialState: State = {
  ids: [],
  entities: {},
  selectedSessionId: null,
};

export function reducer(state = initialState, action: session.Actions | collection.Actions): State {
  switch (action.type) {
    case session.SEARCH_COMPLETE:
    case collection.LOAD_SUCCESS: {
      const sessions = action.payload;
      const newSessions = sessions.filter((session: Session) => !state.entities[session.id]);

      const newSessionIds = newSessions.map((session: Session) => session.id);
      const newSessionEntities = newSessions.reduce((entities: State['entities'], session: Session) => {
        return {
          ...entities,
          [session.id]: session
        };
      }, <State['entities']>{});

      return {
        ...state,
        ids: [ ...state.ids, ...newSessionIds ],
        entities: {
          ...state.entities,
          ...newSessionEntities
        },
      };
    }

    case session.LOAD: {
      const session = action.payload;

      if (state.ids.includes(session.id)) {
        return state;
      }

      return {
        ...state,
        ids: [ ...state.ids, session.id ],
        entities: {
          ...state.entities,
          [session.id]: session
        }
      };
    }

    case session.SELECT: {
      return {
        ...state,
        selectedSessionId: action.payload
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

export const getSelectedId = (state: State) => state.selectedSessionId;

export const getSelected = createSelector(
  getEntities,
  getSelectedId,
  (entities: State['entities'], selectedId: string) => entities[selectedId]
);

export const getAll = createSelector(getEntities, getIds, (entities: State['entities'] , ids: State['ids']) => {
  return ids.map((id: string) => entities[id]);
});
