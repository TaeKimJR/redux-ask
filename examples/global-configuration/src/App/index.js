import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../configureStore';
import GlobalConfiguration from '../GlobalConfiguration';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={configureStore()}>
          <GlobalConfiguration />
        </Provider>
      </div>
    );
  }
}

export default App;
