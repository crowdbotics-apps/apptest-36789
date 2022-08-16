import * as Types from './types';

const INITIAL = {
  list: [],
  purchased: [],
  view: {},
  error: null,
  loading: false,
};

export default (state = INITIAL, action) => {
  switch (action.type) {
    case Types.START_FETCH:
      return {...state, loading: true, error: null};
    case Types.FETCH:
      return {...state, loading: false, list: action.data};
    case Types.PURCHASED:
      return {...state, loading: false, purchased: action.data};
    case Types.VIEW:
      return {...state, loading: false, view: action.data};
    case Types.FETCH_SUCCESS:
      return {...state, loading: false};
    case Types.ERROR_FETCH:
      return {...state, loading: false, error: action.error};
    default:
      return state;
  }
};
