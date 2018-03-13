import * as R from 'ramda';

const callIfFunction = R.when(
  objectOrFunc => typeof objectOrFunc === 'function',
  R.call,
);

export {
  callIfFunction,
};
