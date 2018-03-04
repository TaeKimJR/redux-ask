import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import requestsReducer from 'redux-ask';

// Setup reducers (make sure the requests reducer is placed under the `requests` key)
const reducers = combineReducers({
  requests: requestsReducer,
});

// Must have thunk middleware setup
const middleware = applyMiddleware(thunk);

// Configure store
const configureStore = (initialState = {}) => createStore(reducers, initialState, middleware);

export default configureStore;