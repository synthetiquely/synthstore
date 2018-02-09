export interface Action {
  type?: string;
  payload?: any;
}

export interface State {
  [key: string]: any;
}

export interface Reducer {
  [key: string]: Function;
}
