import * as R from 'ramda';

const callIfFunction = R.when(
  R.is('function'),
  R.call,
);

export {
  callIfFunction,
};
