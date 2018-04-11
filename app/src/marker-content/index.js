import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModalManager from '../modal-manager';

export default class MarkerContent extends Component {

	constructor(props) {
		super(props);
		this.state = { modalIsOpen: false };
	}

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

		const height = (document.body.clientHeight*0.8)+'px';
		const width = (document.body.clientWidth*0.9)+'px';
		const modalContent = <iframe frameBorder="0" title={name} width={width} height={height} src={url}></iframe>

		return (
			<div>
				<strong>{location}</strong> {name}<br />
				<button className="infowindowbutton" type="button" onClick={() => {
					ModalManager.show(modalContent);
				}}>{url}</button>
			</div>
		)
	}
}
