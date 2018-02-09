import { State, Action, Reducer } from './interfaces';

export class Store {
  private state: State;
  private reducers: Reducer;
  private subscribers: Function[];

  constructor(reducers = {}, initalState = {}) {
    this.reducers = reducers;
    this.state = this.reduce(initalState, {});
    this.subscribers = [];
  }

  private reduce(state: State, action: Action): State {
    const newState: State = {};
    for (const prop in this.reducers) {
      newState[prop] = this.reducers[prop](state[prop], action);
    }
    return newState;
  }

  get value(): State {
    return this.state;
  }

  dispatch(action: Action) {
    this.state = this.reduce(this.state, action);
    this.subscribers.forEach((fn) => fn(this.value));
  }

  subscribe(fn: Function) {
    this.subscribers = [...this.subscribers, fn];
    fn(this.value);
    return () => {
      this.subscribers = this.subscribers.filter((sub) => sub !== fn);
    };
  }
}
