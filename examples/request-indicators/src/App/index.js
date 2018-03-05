import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../configureStore';
import RequestIndicators from '../RequestIndicators';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      	<Provider store={configureStore()}>
      		<RequestIndicators />
      	</Provider>
      </div>
    );
  }
}

export default App;
