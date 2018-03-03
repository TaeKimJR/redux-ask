import { createAction } from 'redux-actions';
import { createInfiniteAction } from 'infinite-reducer';
import { REQUEST_REDUCER_IDENTIFIER } from './constants';
import * as types from './types';

const setInitialUnwrapped = createAction(types.SET_INITIAL);
const setPendingUnwrapped = createAction(types.SET_PENDING);
const setSuccessUnwrapped = createAction(types.SET_SUCCESS);
const setFailureUnwrapped = createAction(types.SET_FAILURE);

export const unwrapped = {
  setInitial: setInitialUnwrapped,
  setPending: setPendingUnwrapped,
  setSuccess: setSuccessUnwrapped,
  setFailure: setFailureUnwrapped,
};

const setInitial = createInfiniteAction(REQUEST_REDUCER_IDENTIFIER, setInitialUnwrapped);
const setPending = createInfiniteAction(REQUEST_REDUCER_IDENTIFIER, setPendingUnwrapped);
const setSuccess = createInfiniteAction(REQUEST_REDUCER_IDENTIFIER, setSuccessUnwrapped);
const setFailure = createInfiniteAction(REQUEST_REDUCER_IDENTIFIER, setFailureUnwrapped);

export {
  setInitial,
  setPending,
  setSuccess,
  setFailure,
};
