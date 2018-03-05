import * as R from 'ramda';
import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { createInfiniteReducer } from 'infinite-reducer';
import { REQUEST_REDUCER_IDENTIFIER, status } from './constants';
import * as types from './types';

// Used for each individual requests
const requestInitialState = {
  status: status.NOT_STARTED,
  response: null,
  error: null,
};
export const requestReducer = handleActions(
  {
    [types.SET_INITIAL]: R.always(requestInitialState),
    [types.SET_PENDING]: state => R.assoc('status', status.PENDING, state),
    [types.SET_SUCCESS]: (state, { payload }) => R.compose(
      R.assoc('response', payload),
      R.assoc('status', status.SUCCESS),
    )(state),
    [types.SET_FAILURE]: (state, { payload }) => R.compose(
      R.assoc('error', payload),
      R.assoc('status', status.FAILURE),
    )(state),
  },
  requestInitialState,
);

// Used for all requests, sharing the requestReducer
const requestReducers = createInfiniteReducer(REQUEST_REDUCER_IDENTIFIER, requestReducer);


// Used for configuring the request api
const configInitialState = {
  options: {},
  onUnauthenticated: null,
  onSuccess: null,
  onFailure: null,
};

export const configReducer = handleActions(
  {
    [types.SET_CONFIG]: (state, { payload }) => R.merge(configInitialState, payload),
  },
  configInitialState,
);

// Used to create the reducer (allowing for configuration overrides passed in)
const reducer = combineReducers({
  config: configReducer,
  requests: requestReducers,
});

export default reducer;

