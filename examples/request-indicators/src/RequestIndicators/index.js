import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createRequest, selectors } from 'redux-ask';
import './RequestIndicators.css';

const REQUEST_KEY = 'GET_POST_REQUEST';

// Create your request
const successRequest = createRequest(() => ({
  method: 'GET',
  url: 'https://reqres.in/api/users?page=2',
}));

const failRequest = createRequest(() => ({
  method: 'GET',
  url: 'https://reqres.in/api/users/23',
}));

const longRequest = createRequest(() => ({
  method: 'GET',
  url: 'https://reqres.in/api/users?delay=3',
}));

// Create your component
class RequestIndicators extends Component {
  static propTypes = {
    isNotStarted: PropTypes.bool.isRequired,
    isPending: PropTypes.bool.isRequired,
    isSuccessful: PropTypes.bool.isRequired,
    isFailed: PropTypes.bool.isRequired,
    successRequest: PropTypes.func.isRequired,
    failRequest: PropTypes.func.isRequired,
    longRequest: PropTypes.func.isRequired,
  };

  handleSuccess = () => {
    this.props.successRequest();
  };

  handleFail = () => {
    this.props.failRequest();
  };

  handleLong = () => {
    this.props.longRequest();
  };

  render() {
    const {
      isNotStarted, isPending, isSuccessful, isFailed,
    } = this.props;

    return (
      <div>
        <h1>Redux Ask</h1>
        <h1>Request Indicators Example</h1>
        <p>
          Click on a button to make a request!
        </p>
        <div>
          <button onClick={this.handleSuccess}>Click Me (success)</button>
          <button onClick={this.handleFail}>Click Me (fail)</button>
          <button onClick={this.handleLong}>Click Me (long request)</button>
        </div>
        <div>
          <div>
            <h3>Status</h3>
            <div>
              <ul className="status">
                <li>[IS NOT STARTED] {isNotStarted.toString()}</li>
                <li>[IS PENDING] {isPending.toString()}</li>
                <li>[IS SUCCESSFUL] {isSuccessful.toString()}</li>
                <li>[IS FAILED] {isFailed.toString()}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isNotStarted: selectors.isNotStartedSelector(REQUEST_KEY)(state),
  isPending: selectors.isPendingSelector(REQUEST_KEY)(state),
  isSuccessful: selectors.isSuccessfulSelector(REQUEST_KEY)(state),
  isFailed: selectors.isFailedSelector(REQUEST_KEY)(state),
});

// Wrap the request in dispatch. Make sure to pass a unique request identifier to the
// request action.
const mapDispatchToProps = {
  successRequest: successRequest(REQUEST_KEY),
  failRequest: failRequest(REQUEST_KEY),
  longRequest: longRequest(REQUEST_KEY),
};

// Export the final component
export default connect(mapStateToProps, mapDispatchToProps)(RequestIndicators);
