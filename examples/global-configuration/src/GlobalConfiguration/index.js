import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setRequestConfig, createRequest } from 'redux-ask';

const FIRST_REQUEST_KEY = 'FIRST_REQUEST';
const SECOND_REQUEST_KEY = 'SECOND_REQUEST';
const THIRD_REQUEST_KEY = 'THIRD_REQUEST';

const firstRequest = createRequest(() => ({
  method: 'GET',
  url: 'https://jsonplaceholder.typicode.com/posts/1',
}));

const secondRequest = createRequest(() => ({
  method: 'GET',
  url: 'https://jsonplaceholder.typicode.com/posts/2',
}));

const thirdRequest = createRequest(() => ({
  method: 'GET',
  url: 'https://jsonplaceholder.typicode.com/posts/3',
}));

// Create your component
class BasicUsage extends Component {
  static propTypes = {
    firstRequest: PropTypes.func.isRequired,
    secondRequest: PropTypes.func.isRequired,
    thirdRequest: PropTypes.func.isRequired,
    setRequestConfig: PropTypes.func.isRequired,
  };

  state = {
    response: null,
  };

  componentDidMount() {
    // Before any requests are made, set the global configuration.
    // This should be done at the highest point in your App.
    this.props.setRequestConfig(this.getConfig());
  }

  getConfig = () => ({
    onSuccess: response => () => {
      this.setState({ response });
    },
  });

  handleFirstRequest = () => {
    this.props.firstRequest();
  };

  handleSecondRequest = () => {
    this.props.secondRequest();
  };

  handleThirdRequest = () => {
    this.props.thirdRequest();
  };

  render() {
    const { response } = this.state;

    return (
      <div>
        <h1>Redux Ask</h1>
        <h1>Global Configuration Example</h1>
        <p>
          Click on a button to make a request. All 3 requests share the onSuccess handler defined
          in the global config.
        </p>
        <div>
          <button onClick={this.handleFirstRequest}>Send Request 1</button>
          <button onClick={this.handleSecondRequest}>Send Request 2</button>
          <button onClick={this.handleThirdRequest}>SEnd Request 3</button>
        </div>
        {
          response && (
            <div>
              <h2>Response</h2>
              <div>
                {JSON.stringify(response)}
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

// Wrap the setRequestConfig in dispatch.
const mapDispatchToProps = {
  firstRequest: firstRequest(FIRST_REQUEST_KEY),
  secondRequest: secondRequest(SECOND_REQUEST_KEY),
  thirdRequest: thirdRequest(THIRD_REQUEST_KEY),
  setRequestConfig,
};

// Export the final component
export default connect(null, mapDispatchToProps)(BasicUsage);
