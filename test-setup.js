import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

global.window = {};
global.noop = () => {};
global.mockStore = configureMockStore([thunk]);
