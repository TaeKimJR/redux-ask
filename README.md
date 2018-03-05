# Redux Ask
> Remove boilerplate around requests... just ask!

[![NPM Version](https://img.shields.io/npm/v/redux-ask.svg)](https://www.npmjs.com/package/redux-ask)
[![License](https://img.shields.io/npm/l/redux-ask.svg)](https://www.npmjs.com/package/redux-ask)
[![Downloads Stats](https://img.shields.io/github/downloads/taekimjr/redux-ask/total.svg)](https://www.npmjs.com/package/redux-ask)

Redux Ask is a Redux library that simplifies requests and removes the boilerplate. There's no need to create new state or flags for every request anymore!

## Requirements
- [React](https://www.npmjs.com/package/react)
- [Redux](https://www.npmjs.com/package/redux)
- [Thunk Middleware](https://www.npmjs.com/package/redux-thunk)
- [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

## Installation

```sh
yarn add redux-ask
```

## Usage
### Setup your Request reducer
Pass the provided reducer to the store under the `requests` key...
```javascript
import { createStore, combineReducers } from 'redux';
import requestReducer from 'redux-ask';

const reducers = combineReducers({
	requests: requestReducer,
});

const store = createStore(reducers);
```

### Create your Request
Before you can send requests, you'll need to use the provided `createRequest` helper to define a request...
```javascript
import { createRequest } from 'redux-ask';

export const createUser = createRequest(user => ({
	method: 'POST',
	url: '/api/users',
	body: user,
}));
```

To handle the response, use the `onSuccess` and `onFailure` thunk handlers. You can use this opportunity to normalize entities, pass entities to your state, or notify users of errors...
```javascript
import { createRequest } from 'redux-ask';
import { receiveUser } from './user-actions';

export const createUser = createRequest(user => ({
	method: 'POST',
	url: '/api/users',
	body: user,
	onSuccess: (response) => dispatch => {
		const newUser = response.result;
		dispatch(receiveUser(newUser));
	},
	onFailure: () => dispatch => {
		dispatch(displayNotification('There was an error creating a user'));
	},
}));
```

If you want to configure your request, use the `options` parameter. This will be passed as the fetch `init` parameter (see https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch).
```javascript
import { createRequest } from 'redux-ask';

export const createUser = createRequest(user => ({
	method: 'POST',
	url: '/api/users',
	body: user,
	options: {
		headers: new Headers({
	      'Content-Type': 'application/json',
	      'Cache-Control': 'no-cache',
	    }),
		credentials: 'include',
	},
}));
```

### See it in action!
In order to send the request, you'll need to wrap the created requests in dispatch and pass a UNIQUE request key...
```javascript
import React from 'react';
import { connect } from 'redux-actions';
import { createUser } from './user-requests';

const CreateUserButton = ({ createUser, user }) => {
	return (
		<button onClick={() => createUser(user)}>
			Create User
		</button>
	)
}

const UNIQUE_REQUEST_KEY = 'REQUEST_KEY';

const mapDispatchToProps = {
	createUser: createUser(UNIQUE_REQUEST_KEY),
};

export default connect(null, mapDispatchToProps)(CreateUserButton);
```

If you would like to check the status of your request, use our selectors with the same UNIQUE request key...
```javascript
import { selectors } from 'redux-ask';

// UNIQUE_REQUEST_KEY === 'REQUEST_KEY';

const mapStateToProps = state => {
	return {
		isNotStarted: selectors.isNotStartedSelector(UNIQUE_REQUEST_KEY)(state),
		isPending: selectors.isPendingSelector(UNIQUE_REQUEST_KEY)(state),
		isSuccessful: selectors.isSuccessfulSelector(UNIQUE_REQUEST_KEY)(state),
		isFailed: selectors.isFailedSelector(UNIQUE_REQUEST_KEY)(state),
	};
}

```

BOOM!

## Global Configuration
Most Apps use common configuration for all requests made. Redux Ask allows you to set a global configuration that will be used for all requests.

To set the global configuration, use the provided `setRequestConfig` action...
```javascript
import React, { Component } from 'react';
import { actions } from 'redux-ask';

class App extends Component {
  componentWillMount() {
    this.props.setRequestConfig({
      options: { ... },
      onSuccess: () => dispatch => { ... },
      onFailure: () => dispatch => { ... },
      onUnauthenticated: () => dispatch => { ... },
    });
  }
}

const mapDispatchToProps = {
   setRequestConfig: actions.setRequestConfig,
};

```

Make sure to set the Global Configuration before any requests are made!

## API
### createRequest
TODO

### Selectors
TODO

### setConfiguration
TODO


## Meta

Tae Kim – [Github](https://github.com/TaeKimJR) - [LinkedIn](https://www.linkedin.com/in/taekimjr/) – TaeKimJR@gmail.com

Distributed under the MIT license. See ``LICENSE`` for more information.

## Contributing
1. Fork it (<https://github.com/TaeKimJR/redux-ask/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request
