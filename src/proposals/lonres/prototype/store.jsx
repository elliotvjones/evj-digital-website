import { createContext, useContext, useReducer } from 'react';
import { AGENTS, MEMBERS, REQUIREMENTS } from './mockData';

// One shared store, so a requirement registered in one prototype frame appears in the others.

const initialState = { agents: AGENTS, requirements: REQUIREMENTS };

function reducer(state, action) {
  switch (action.type) {
    case 'register':
      return { ...state, requirements: [{ ...action.requirement, isNew: true }, ...state.requirements] };
    default:
      return state;
  }
}

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const value = useReducer(reducer, initialState);
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  return useContext(StoreContext);
}

export const memberById = (id) => MEMBERS.find((m) => m.id === id);

export const trackRecordOf = (agent) =>
  agent.recommendations.filter((v) => v.deal).map((v) => ({ ...v, member: memberById(v.by) }));

// The directory ranks itself: most recommendations first, then most track record.
export const rankAgents = (agents) =>
  [...agents].sort(
    (a, b) =>
      b.recommendations.length - a.recommendations.length ||
      trackRecordOf(b).length - trackRecordOf(a).length ||
      a.name.localeCompare(b.name),
  );

