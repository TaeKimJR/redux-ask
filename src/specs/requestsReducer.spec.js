import { requestReducer } from '../reducer';
import { unwrapped as actions } from '../actions';
import { status } from '../constants';

describe('[Requests] Request Reducer', () => {
  describe('SET_INITIAL', () => {
    test('should set the state back to initial state', () => {
      const state = {
        status: status.SUCCESS,
        response: { foo: 'bar' },
        error: null,
      };

      const reduced = requestReducer(state, actions.setInitial());

      expect(reduced).toMatchSnapshot();
    });
  });

  describe('SET_PENDING', () => {
    test('should set the state to pending', () => {
      const reduced = requestReducer(null, actions.setPending());

      expect(reduced).toMatchSnapshot();
    });
  });

  describe('SET_SUCCESS', () => {
    test('should set the status and response object given', () => {
      const response = { foo: 'bar' };

      const reduced = requestReducer(null, actions.setSuccess(response));

      expect(reduced).toMatchSnapshot();
    });
  });

  describe('SET_FAILURE', () => {
    test('should set the status and error object given', () => {
      const error = { foo: 'bar' };

      const reduced = requestReducer(null, actions.setFailure(error));

      expect(reduced).toMatchSnapshot();
    });
  });
});
