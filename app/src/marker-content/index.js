import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MarkerContent extends Component {

	static propTypes = {
		location: PropTypes.string,
		name: PropTypes.string,
		url: PropTypes.string
	};

	render() {
		const {
		location,
		name,
		url
		} = this.props;

		return (
			<div>
				<strong>{location}</strong> {name}<br />
				<button className="infowindowbutton" type="button">{url}</button>
			</div>
		)
	}
}
