import { configReducer } from '../reducer';

describe('[Requests] Config Reducer', () => {
  test('should use the default empty config when no initial state is given', () => {
    const reduced = configReducer();

    expect(reduced).toMatchSnapshot();
  });

  test('should override any config with state given', () => {
    const overrides = {
      options: { foo: 'bar' },
      onFailure: () => {},
    };

    const reduced = configReducer(overrides);

    expect(reduced).toMatchSnapshot();
  });
});
