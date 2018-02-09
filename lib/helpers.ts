import { Store } from './store';
import { Reducer, State } from './interfaces';

export const createStore = (reducers: Reducer, initalState: State) => {
  return new Store(reducers, initalState);
};
