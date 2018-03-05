import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createRequest } from 'redux-ask';

const REQUEST_KEY = 'GET_POST_REQUEST';

// Create your request
const getPostRequest = createRequest(id => ({
	method: 'GET',
	url: `https://jsonplaceholder.typicode.com/posts/${id}`,
}));

// Create your component
class BasicUsage extends Component {
	static propTypes = {
		getPost: PropTypes.func.isRequired,
	}

	state = {
		postId: 1,
		response: null,
	};

	handleClick = () => {
		const { getPost } = this.props;
		const { postId } = this.state;

		this.setState({ postId: postId + 1 });

		getPost(postId)
			.then(response => {
				this.setState({
					response,
				})
			});
	};

	render() {
		const { response } = this.state;

		return (
			<div>
				<h1>Redux Ask</h1>
				<h1>Basic Usage Example</h1>
				<p>
					Click on the button to make a request!
				</p>
				<div>
					<button onClick={this.handleClick}>Click Me</button>
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
};

// Wrap the request in dispatch. Make sure to pass a unique request identifier to the request action.
const mapDispatchToProps = {
	getPost: getPostRequest(REQUEST_KEY),
};

// Export the final component
export default connect(null, mapDispatchToProps)(BasicUsage);