import { status } from '../constants';
import * as selectors from '../selectors';

describe('[Requests] Selectors', () => {
  let state;
  let requestKey;

  describe('Not Started Request', () => {
    requestKey = 'notStartedRequest';

    beforeEach(() => {
      state = {
        requests: {
          requests: {
            [requestKey]: {
              status: status.NOT_STARTED,
              response: null,
              error: null,
            },
          },
        },
      };
    });

    describe('statusSelector', () => {
      test('should return the current status constant', () => {
        expect(selectors.statusSelector(requestKey)(state)).toEqual(status.NOT_STARTED);
      });
    });

    describe('isNotStartedSelector', () => {
      test('should return true', () => {
        expect(selectors.isNotStartedSelector(requestKey)(state)).toEqual(true);
      });
    });

    describe('isPendingSelector', () => {
      test('should return true', () => {
        expect(selectors.isPendingSelector(requestKey)(state)).toEqual(false);
      });
    });

    describe('isSuccessfulSelector', () => {
      test('should return false', () => {
        expect(selectors.isSuccessfulSelector(requestKey)(state)).toEqual(false);
      });
    });

    describe('isFailedSelector', () => {
      test('should return false', () => {
        expect(selectors.isFailedSelector(requestKey)(state)).toEqual(false);
      });
    });

    describe('allStatusSelector', () => {
      test('should return all of the statuses', () => {
        expect(selectors.allStatusSelector(requestKey)(state)).toEqual({
          notStarted: true,
          isPending: false,
          isSuccessful: false,
          isFailed: false,
        });
      });
    });

    describe('responseSelector', () => {
      test('should return nothing', () => {
        expect(selectors.responseSelector(requestKey)(state)).toBe(null);
      });
    });

    describe('errorSelector', () => {
      test('should return nothing', () => {
        expect(selectors.errorSelector(requestKey)(state)).toBe(null);
      });
    });
  });

  describe('Pending Request', () => {
    requestKey = 'pendingRequest';

    beforeEach(() => {
      state = {
        requests: {
          requests: {
            [requestKey]: {
              status: status.PENDING,
              response: null,
              error: null,
            },
          },
        },
      };
    });

    describe('statusSelector', () => {
      test('should return the current status constant', () => {
        expect(selectors.statusSelector(requestKey)(state)).toEqual(status.PENDING);
      });
    });

    describe('isNotStartedSelector', () => {
      test('should return false', () => {
        expect(selectors.isNotStartedSelector(requestKey)(state)).toEqual(false);
      });
    });

    describe('isPendingSelector', () => {
      test('should return true', () => {
        expect(selectors.isPendingSelector(requestKey)(state)).toEqual(true);
      });
    });

    describe('isSuccessfulSelector', () => {
      test('should return false', () => {
        expect(selectors.isSuccessfulSelector(requestKey)(state)).toEqual(false);
      });
    });

    describe('isFailedSelector', () => {
      test('should return false', () => {
        expect(selectors.isFailedSelector(requestKey)(state)).toEqual(false);
      });
    });

    describe('allStatusSelector', () => {
      test('should return all of the statuses', () => {
        expect(selectors.allStatusSelector(requestKey)(state)).toEqual({
          notStarted: false,
          isPending: true,
          isSuccessful: false,
          isFailed: false,
        });
      });
    });

    describe('responseSelector', () => {
      test('should return nothing', () => {
        expect(selectors.responseSelector(requestKey)(state)).toBe(null);
      });
    });

    describe('errorSelector', () => {
      test('should return nothing', () => {
        expect(selectors.errorSelector(requestKey)(state)).toBe(null);
      });
    });
  });

  describe('Successful Request', () => {
    requestKey = 'successfulRequest';

    beforeEach(() => {
      state = {
        requests: {
          requests: {
            [requestKey]: {
              status: status.SUCCESS,
              response: { foo: 'bar' },
              error: null,
            },
          },
        },
      };
    });

    describe('statusSelector', () => {
      test('should return the current status constant', () => {
        expect(selectors.statusSelector(requestKey)(state)).toEqual(status.SUCCESS);
      });
    });

    describe('isNotStartedSelector', () => {
      test('should return false', () => {
        expect(selectors.isNotStartedSelector(requestKey)(state)).toEqual(false);
      });
    });

    describe('isPendingSelector', () => {
      test('should return false', () => {
        expect(selectors.isPendingSelector(requestKey)(state)).toEqual(false);
      });
    });

    describe('isSuccessfulSelector', () => {
      test('should return true', () => {
        expect(selectors.isSuccessfulSelector(requestKey)(state)).toEqual(true);
      });
    });

    describe('isFailedSelector', () => {
      test('should return false', () => {
        expect(selectors.isFailedSelector(requestKey)(state)).toEqual(false);
      });
    });

    describe('allStatusSelector', () => {
      test('should return all of the statuses', () => {
        expect(selectors.allStatusSelector(requestKey)(state)).toEqual({
          notStarted: false,
          isPending: false,
          isSuccessful: true,
          isFailed: false,
        });
      });
    });

    describe('responseSelector', () => {
      test('should return the response', () => {
        expect(selectors.responseSelector(requestKey)(state)).toEqual({ foo: 'bar' });
      });
    });

    describe('errorSelector', () => {
      test('should return nothing', () => {
        expect(selectors.errorSelector(requestKey)(state)).toBe(null);
      });
    });
  });

  describe('Failed Request', () => {
    requestKey = 'failedRequest';

    beforeEach(() => {
      state = {
        requests: {
          requests: {
            [requestKey]: {
              status: status.FAILURE,
              response: null,
              error: { errors: [{ field: 'name', message: 'is required' }] },
            },
          },
        },
      };
    });

    describe('statusSelector', () => {
      test('should return the current status constant', () => {
        expect(selectors.statusSelector(requestKey)(state)).toEqual(status.FAILURE);
      });
    });

    describe('isNotStartedSelector', () => {
      test('should return false', () => {
        expect(selectors.isNotStartedSelector(requestKey)(state)).toEqual(false);
      });
    });

    describe('isPendingSelector', () => {
      test('should return false', () => {
        expect(selectors.isPendingSelector(requestKey)(state)).toEqual(false);
      });
    });

    describe('isSuccessfulSelector', () => {
      test('should return false', () => {
        expect(selectors.isSuccessfulSelector(requestKey)(state)).toEqual(false);
      });
    });

    describe('isFailedSelector', () => {
      test('should return true', () => {
        expect(selectors.isFailedSelector(requestKey)(state)).toEqual(true);
      });
    });

    describe('allStatusSelector', () => {
      test('should return all of the statuses', () => {
        expect(selectors.allStatusSelector(requestKey)(state)).toEqual({
          notStarted: false,
          isPending: false,
          isSuccessful: false,
          isFailed: true,
        });
      });
    });

    describe('responseSelector', () => {
      test('should return nothing', () => {
        expect(selectors.responseSelector(requestKey)(state)).toBe(null);
      });
    });

    describe('errorSelector', () => {
      test('should return the error', () => {
        expect(selectors.errorSelector(requestKey)(state)).toEqual({ errors: [{ field: 'name', message: 'is required' }] });
      });
    });
  });
});
