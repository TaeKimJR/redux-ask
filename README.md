# Redux Ask
> Remove boilerplate around requests... just ask!

[![NPM Version](https://img.shields.io/npm/v/redux-ask.svg)](https://www.npmjs.com/package/redux-ask)
[![License](https://img.shields.io/npm/l/redux-ask.svg)](https://www.npmjs.com/package/redux-ask)
[![Downloads Stats](https://img.shields.io/github/downloads/taekimjr/redux-ask/total.svg)](https://www.npmjs.com/package/redux-ask)

Infinite Reducer is a Redux library that allows you to reuse your reducer as many times as you would like.

## Requirements
- [React](https://www.npmjs.com/package/react)
- [Redux](https://www.npmjs.com/package/redux)

## Installation

```sh
yarn add infinite-reducer
```

## Usage
### Create your Infinite Reducer
Starting with a reducer...
```javascript
const reducer = (state = {}, action) => {
	switch (action.type) {
	    case 'TEST_ACTION':
	      return action.payload;
	    default:
	      return state;
	}
};
```

Wrap your reducer using our `createInfiniteReducer` helper, passing a UNIQUE key and the reducer...
```javascript
const UNIQUE_KEY = 'INFINITE_KEY';

const infiniteReducer = createInfiniteReducer(UNIQUE_KEY, reducer);
```

Add your Infinite Reducer anywhere in your store...
```javascript
const reducers = combineReducers({
	infinite: infiniteReducer,
});

const store = createStore(reducers);
```

Reducer setup complete!

### Create your Infinite Action
Starting with an action that your reducer handles...
```javascript
const action = payload => ({
	type: 'TEST_ACTION',
	payload,
});
```

Wrap your action using our `createIniniteAction` helper, passing the same UNIQUE key (given to the infinite reducer) and the action...
```javascript
// UNIQUE_KEY === 'INFINITE_KEY'

const infiniteAction = createInfiniteAction(UNIQUE_KEY, action);
```

Action setup complete!

### See it in action!
Once setup, dispatch the infiniteAction passing a UNIQUE reducer key and any payload the action accepts...
```javascript
const UNIQUE_REDUCER_KEY = 'REDUCER_KEY';
const payload = { foo: 'bar' };

dispatch(infiniteAction(UNIQUE_REDUCER_KEY)(payload))
```

This will create new state under the UNIQUE reducer key based on the reducer implementation...
```javascript
{
	infinite: {
		REDUCER_KEY: {
			foo: 'bar',
		},
	},
}
```

You can create a separate reducer state by passing a new UNIQUE reducer key, while dispatching the same action...
```javascript
const OTHER_UNIQUE_REDUCER_KEY = 'OTHER_REDUCER_KEY';
const payload = { hello: 'world' };

dispatch(infiniteAction(OTHER_UNIQUE_REDUCER_KEY)(payload))
```

This will create new state under the new UNIQUE reducer key...
```javascript
{
	infinite: {
		REDUCER_KEY: {
			foo: 'bar',
		},
		OTHER_REDUCER_KEY: {
			hello: 'world',
		},
	},
}
```

BOOM!

## Meta

Tae Kim – [Github](https://github.com/TaeKimJR) - [LinkedIn](https://www.linkedin.com/in/taekimjr/) – TaeKimJR@gmail.com

Distributed under the MIT license. See ``LICENSE`` for more information.

## Contributing
1. Fork it (<https://github.com/TaeKimJR/infinite-reducer/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request