import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Nav extends Component {

	static propTypes = {
		map: PropTypes.object,
	};

	onClick = () => {
		this.props.map.locateMe()
	}

	render() {
		return (
			<nav>
				<button onClick={this.onClick}>Locate me</button>
			</nav>
		)
	}
}
