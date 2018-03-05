import * as R from 'ramda';
import { status } from './constants';

const REQUESTS_CONFIG_PATH = ['requests', 'config'];
const REQUESTS_REDUCERS_PATH = ['requests', 'requests'];

// --------------------------------
// Internal Selectors
// --------------------------------

// configSelector :: Object -> Object
const configSelector = R.pathOr({}, REQUESTS_CONFIG_PATH);

// optionsSelector :: Object -> Object
const optionsSelector = R.compose(
  R.propOr({}, 'options'),
  configSelector,
);

// onUnauthenticatedSelector :: Object -> Func
const onUnauthenticatedSelector = R.compose(
  R.propOr(null, 'onUnauthenticated'),
  configSelector,
);

// onSuccessSelector :: Object -> Func
const onSuccessSelector = R.compose(
  R.propOr(null, 'onSuccess'),
  configSelector,
);

// onFailureSelector :: Object -> Func
const onFailureSelector = R.compose(
  R.propOr(null, 'onFailure'),
  configSelector,
);

export const internalSelectors = {
  configSelector,
  optionsSelector,
  onUnauthenticatedSelector,
  onSuccessSelector,
  onFailureSelector,
};


// --------------------------------
// External Selectors
// --------------------------------

// requestSelector :: String -> Object -> Object
const requestSelector = requestKey => R.pathOr({}, [...REQUESTS_REDUCERS_PATH, requestKey]);

// statusSelector :: String -> Object -> String
const statusSelector = requestKey => R.compose(
  R.prop('status'),
  requestSelector(requestKey)
);

// isNotStartedSelector :: String -> Object -> T/F
const isNotStartedSelector = requestKey => R.compose(
  R.anyPass([
    R.isNil,
    R.equals(status.NOT_STARTED),
  ]),
  statusSelector(requestKey),
);

// isPending :: String -> Object -> T/F
const isPendingSelector = requestKey => R.compose(
  R.equals(status.PENDING),
  statusSelector(requestKey),
);

// isSuccessfulSelector :: String -> Object -> T/F
const isSuccessfulSelector = requestKey => R.compose(
  R.equals(status.SUCCESS),
  statusSelector(requestKey),
);

// isFailedSelector :: String -> Object -> T/F
const isFailedSelector = requestKey => R.compose(
  R.equals(status.FAILURE),
  statusSelector(requestKey),
);

// allStatusSelector :: String -> Object -> Object
const allStatusSelector = requestKey => state => {
  return {
    notStarted: isNotStartedSelector(requestKey)(state),
    isPending: isPendingSelector(requestKey)(state),
    isSuccessful: isSuccessfulSelector(requestKey)(state),
    isFailed: isFailedSelector(requestKey)(state),
  };
};

// responseSelector :: String -> Object -> Object
const responseSelector = requestKey => R.compose(
  R.prop('response'),
  requestSelector(requestKey),
);

// errorSelector :: String -> Object -> Objet
const errorSelector = requestKey => R.compose(
  R.prop('error'),
  requestSelector(requestKey),
);

export {
  statusSelector,
  isNotStartedSelector,
  isPendingSelector,
  isSuccessfulSelector,
  isFailedSelector,
  allStatusSelector,
  responseSelector,
  errorSelector,
};
