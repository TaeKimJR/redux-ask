import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../configureStore';
import BasicUsage from '../BasicUsage';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={configureStore()}>
          <BasicUsage />
        </Provider>
      </div>
    );
  }
}

export default App;
