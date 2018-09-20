import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Utils from '../helpers/utils';

export default class NavAdmin extends Component {

	static propTypes = {
			userIsLogged: PropTypes.bool,
	};

	renderLogOutButton() {
		return (
			<button onClick={Utils.handleLogOut}>Log out</button>
		);
	}

	render() {
		return (
			<nav>
				{this.props.userIsLogged && this.renderLogOutButton()}
			</nav>
		)
	}
}
