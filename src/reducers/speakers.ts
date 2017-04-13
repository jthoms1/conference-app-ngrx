import { createSelector } from 'reselect';
import { Speaker } from '../models/speaker';
import * as speaker from '../actions/speaker';
import * as collection from '../actions/collection';


export type SpeakerEntries = {
  [id: string]: Speaker
}

export interface State {
  ids: string[];
  entities: SpeakerEntries;
  selectedSpeakerId: string | null;
};

export const initialState: State = {
  ids: [],
  entities: {},
  selectedSpeakerId: null,
};

export function reducer(state = initialState, action: speaker.Actions | collection.Actions): State {
  switch (action.type) {
    case speaker.SEARCH_COMPLETE:
    case collection.LOAD_SUCCESS: {
      const speakers = action.payload;
      const newSpeakers = speakers.filter((speaker: Speaker) => !state.entities[speaker.id]);

      const newSpeakerIds = newSpeakers.map((speaker: Speaker) => speaker.id);
      const newSpeakerEntities = newSpeakers.reduce((entities: SpeakerEntries, book: Speaker) => {
        return {
          ...entities,
          [book.id]: book
        };
      }, {});

      return {
        ...state,
        ids: [ ...state.ids, ...newSpeakerIds ],
        entities: {
          ...state.entities,
          newSpeakerEntities
        },
      };
    }

    case book.LOAD: {
      const book = action.payload;

      if (state.ids.includes(book.id)) {
        return state;
      }

      return {
        ...state,
        ids: [ ...state.ids, book.id ],
        entities: {
          ...state.entities,
          [book.id]: book
        }
      };
    }

    case book.SELECT: {
      return {
        ...state,
        selectedSpeakerId: action.payload
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

export const getSelectedId = (state: State) => state.selectedSpeakerId;

export const getSelected = createSelector(
  getEntities,
  getSelectedId,
  (entities: SpeakerEntries, selectedId: string) => entities[selectedId]
);

export const getAll = createSelector(getEntities, getIds, (entities: SpeakerEntries , ids: string[]) => {
  return ids.map((id: string) => entities[id]);
});
