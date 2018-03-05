import { configReducer } from '../reducer';
import * as actions from '../actions';

describe('[Requests] Config Reducer', () => {
  describe('Initial State', () => {
    test('should use the default empty config when no initial state is given', () => {
      const reduced = configReducer(undefined, {});

      expect(reduced).toMatchSnapshot();
    });

    test('should override any config with state given', () => {
      const overrides = {
        options: { foo: 'bar' },
        onFailure: () => {},
      };

      const reduced = configReducer(overrides, {});

      expect(reduced).toMatchSnapshot();
    });
  });

  test('SET_CONFIG', () => {
    const config = {
      options: {
        headers: {
          'Content-type': 'application/json',
        },
      },
      onUnauthenticated: () => () => 'unauthenticated',
      onSuccess: () => () => 'success',
      onFailure: () => () => 'failure',
    };
    const state = {};

    const reduced = configReducer(state, actions.setRequestConfig(config));

    expect(reduced).toMatchSnapshot();
  });
});
