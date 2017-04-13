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
  selectedSpeakerId: string | null
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
      const newSpeakerEntities = newSpeakers.reduce((entities: SpeakerEntries, speaker: Speaker) => {
        return {
          ...entities,
          [speaker.id]: speaker
        };
      }, <SpeakerEntries>{});

      return {
        ...state,
        ids: [ ...state.ids, ...newSpeakerIds ],
        entities: {
          ...state.entities,
          ...newSpeakerEntities
        },
      };
    }

    case speaker.LOAD: {
      const speaker = action.payload;

      if (state.ids.includes(speaker.id)) {
        return state;
      }

      return {
        ...state,
        ids: [ ...state.ids, speaker.id ],
        entities: {
          ...state.entities,
          [speaker.id]: speaker
        }
      };
    }

    case speaker.SELECT: {
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
