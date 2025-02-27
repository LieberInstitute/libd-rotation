import { readable, writable, type Writable } from 'svelte/store';

export type State = {
  lockedIdx: { idx: number; source: 'scatter' | 'map' };
  // lockedCoords: { x: number; y: number };
  currIdx: { idx: number; source: 'scatter' | 'map' };
  // currCoords: { x: number; y: number };
};

export const store: Writable<State> = writable({
  lockedIdx: { idx: -1, source: 'scatter' },
  currIdx: { idx: 0, source: 'scatter' }
});

export const currRna: Writable<string> = writable('');

export const params = { spotDiam: 65e-6, mPerPx: 0.497e-6 };
