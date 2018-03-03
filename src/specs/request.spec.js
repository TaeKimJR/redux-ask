import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import request from '../request';

const initialState = {
  requests: {
    config: {},
    requests: {},
  },
};

describe('[Requests] request', () => {
  let store;
  beforeEach(() => {
    store = mockStore(initialState);

    fetchMock.reset();
    fetchMock.restore();
  });

  afterAll(fetchMock.restore);

  describe('GET', () => {
    describe('Basic Usage', () => {
      test('should make a GET request and set request flags', () => {
        const user = { id: 1, name: 'Tester' };

        fetchMock.get('/api/users', user);

        const key = 'GET_REQUEST_KEY';
        const options = {
          method: 'GET',
          url: '/api/users',
        };

        return store.dispatch(request(key, options))
          .then(result => {
            expect(result).toEqual(user);
            expect(store.getActions()).toMatchSnapshot();
          });
      });
    });
  });

  describe('PUT', () => {
    describe('Basic Usage', () => {
      test('should make a PUT request and set request flags', () => {
        const body = { name: 'Tester' };
        const user = { id: 1, name: 'Tester' };

        fetchMock.put((url, opts) => (url === '/api/users/1' && opts.body === JSON.stringify(body)), user);

        const key = 'PUT_REQUEST_KEY';
        const options = {
          method: 'PUT',
          url: '/api/users/1',
          body,
        };

        return store.dispatch(request(key, options))
          .then(result => {
            expect(result).toEqual(user);
            expect(store.getActions()).toMatchSnapshot();
          });
      });
    });
  });

  describe('POST', () => {
    describe('Basic Usage', () => {
      test('should make a POST request and set request flags', () => {
        const user = { id: 1, name: 'Tester' };

        fetchMock.post((url, opts) => (url === '/api/users' && opts.body === JSON.stringify(user)), user);

        const key = 'POST_REQUEST_KEY';
        const options = {
          method: 'POST',
          url: '/api/users',
          body: user,
        };

        return store.dispatch(request(key, options))
          .then(result => {
            expect(result).toEqual(user);
            expect(store.getActions()).toMatchSnapshot();
          });
      });
    });
  });
  
  describe('DELETE', () => {
    describe('Basic Usage', () => {
      test('should make a DELETE request and set request flags', () => {
        const user = { id: 1, name: 'Tester' };

        fetchMock.delete('/api/users', user);

        const key = 'DELETE_REQUEST_KEY';
        const options = {
          method: 'DELETE',
          url: '/api/users',
        };

        return store.dispatch(request(key, options))
          .then(result => {
            expect(result).toEqual(user);
            expect(store.getActions()).toMatchSnapshot();
          });
      });
    });
  });

  describe('With options', () => {
    test('should make a GET request, passing the extra options to the request', () => {
      const headers = {
        'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json',
      };
      const user = { id: 1, name: 'Tester' };

      fetchMock.get((url, opts) => (url === '/api/users' && opts.headers === headers), user);

      const key = 'GET_REQUEST_KEY';
      const options = {
        method: 'GET',
        url: '/api/users',
        options: {
          headers,
        },
      };

      return store.dispatch(request(key, options))
        .then(result => {
          expect(result).toEqual(user);
          expect(store.getActions()).toMatchSnapshot();
        });
    });
  });

  describe('With onSuccess handler', () => {
    test('should make a request, calling the onSuccess handler on completion', () => {
      const onSuccessSpy = jest.fn();
      const user = { id: 1, name: 'Tester' };

      fetchMock.get('/api/users', user);

      const key = 'GET_REQUEST_KEY';
      const options = {
        method: 'GET',
        url: '/api/users',
        onSuccess: (...args) => () => onSuccessSpy(...args),
      };

      expect(onSuccessSpy.mock.calls.length).toBe(0);

      return store.dispatch(request(key, options))
        .then(() => {
          expect(onSuccessSpy.mock.calls.length).toBe(1);
          expect(onSuccessSpy.mock.calls[0][0]).toEqual(user);
        });
    });
  });

  describe('With onFailure handler', () => {
    test('should make a request, calling the onFailure handler on failure', () => {
      const errorResponse = { errorMessage: 'Something went wrong!' };
      const onFailureSpy = jest.fn();

      fetchMock.get('/api/users', {
        status: 500,
        body: errorResponse,
      });

      const key = 'GET_REQUEST_KEY';
      const options = {
        method: 'GET',
        url: '/api/users',
        onFailure: (...args) => () => onFailureSpy(...args),
      };

      expect(onFailureSpy.mock.calls.length).toBe(0);

      return store.dispatch(request(key, options))
        .then(() => {
          expect(onFailureSpy.mock.calls.length).toBe(1);
          expect(onFailureSpy.mock.calls[0][0]).toEqual(errorResponse);
        });
    });
  });

  describe('With onUnauthenticated handler', () => {
    test('should make a request, calling the onUnauthenticated handler on 401 status', () => {
      const onUnauthenticatedSpy = jest.fn();

      fetchMock.get('/api/users', 401);

      const key = 'GET_REQUEST_KEY';
      const options = {
        method: 'GET',
        url: '/api/users',
        onUnauthenticated: (...args) => () => onUnauthenticatedSpy(...args),
      };

      expect(onUnauthenticatedSpy.mock.calls.length).toBe(0);

      return store.dispatch(request(key, options))
        .then(() => {
          expect(onUnauthenticatedSpy.mock.calls.length).toBe(1);
        });
    });
  });

  describe('With global configuration', () => {
    let onSuccessSpy;
    let onFailureSpy;
    let onUnauthenticatedSpy;
    let headers;

    beforeEach(() => {
      onSuccessSpy = jest.fn();
      onFailureSpy = jest.fn();
      onUnauthenticatedSpy = jest.fn();

      headers = {
        'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json',
      };

      const globalConfiguration = {
        options: {
          headers,
        },
        onSuccess: (...args) => () => onSuccessSpy(...args),
        onFailure: (...args) => () => onFailureSpy(...args),
        onUnauthenticated: (...args) => () => onUnauthenticatedSpy(...args),
      };
      const state = {
        requests: {
          config: globalConfiguration,
          requests: {},
        },
      };
      store = mockStore(state);
    });

    test('should use the options from the global configuration in redux state under requests.config.options', () => {
      const user = { id: 1, name: 'Tester' };

      fetchMock.get((url, opts) => (url === '/api/users' && opts.headers === headers), user);

      const key = 'GET_REQUEST_KEY';
      const options = {
        method: 'GET',
        url: '/api/users',
      };

      return store.dispatch(request(key, options))
        .then(result => {
          expect(result).toEqual(user);
          expect(store.getActions()).toMatchSnapshot();
        });
    });

    test('should use the onSuccess handler from the global configuration in redux state under requests.config.onSuccess', () => {
      const user = { id: 1, name: 'Tester' };

      fetchMock.get((url, opts) => (url === '/api/users' && opts.headers === headers), user);

      const key = 'GET_REQUEST_KEY';
      const options = {
        method: 'GET',
        url: '/api/users',
      };

      expect(onSuccessSpy.mock.calls.length).toBe(0);

      return store.dispatch(request(key, options))
        .then(() => {
          expect(onSuccessSpy.mock.calls.length).toBe(1);
          expect(onSuccessSpy.mock.calls[0][0]).toEqual(user);
        });
    });

    test('should use the onFailure handler from the global configuration in redux state under requests.config.onFailure', () => {
      const errorResponse = { errorMessage: 'Something went wrong!' };
      const user = { id: 1, name: 'Tester' };

      fetchMock.get((url, opts) => (url === '/api/users' && opts.headers === headers), {
        status: 500,
        body: errorResponse,
      });

      const key = 'GET_REQUEST_KEY';
      const options = {
        method: 'GET',
        url: '/api/users',
      };

      expect(onFailureSpy.mock.calls.length).toBe(0);

      return store.dispatch(request(key, options))
        .then(() => {
          expect(onFailureSpy.mock.calls.length).toBe(1);
          expect(onFailureSpy.mock.calls[0][0]).toEqual(errorResponse);
        });
    });

    test('should use the onUnauthenticated handler from the global configuration in redux state under requests.config.onUnauthenticated', () => {
      const user = { id: 1, name: 'Tester' };

      fetchMock.get((url, opts) => (url === '/api/users' && opts.headers === headers), 401);

      const key = 'GET_REQUEST_KEY';
      const options = {
        method: 'GET',
        url: '/api/users',
      };

      expect(onUnauthenticatedSpy.mock.calls.length).toBe(0);

      return store.dispatch(request(key, options))
        .then(() => {
          expect(onUnauthenticatedSpy.mock.calls.length).toBe(1);
        });
    });
  });
});
