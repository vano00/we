import React, { Component } from 'react';
import { connect } from 'react-redux';

import Layout from './containers/Layout/Layout';
import * as actions from './store/actions/index';

class App extends Component {
	componentDidMount() {
		this.props.onFetchWebcams();
	}

	render() {
		return (
			<div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
				<Layout />
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onFetchWebcams: () => dispatch(actions.fetchWebcams())
	}
}

export default connect(null, mapDispatchToProps)(App);
