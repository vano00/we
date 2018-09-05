import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModalManager from '../modal-manager';

export default class MarkerContent extends Component {

	state = {
		modalIsOpen: false
	}

	constructor(props) {
		super(props);
	}

	static propTypes = {
		location: PropTypes.string,
		name: PropTypes.string,
		url: PropTypes.string,
		type: PropTypes.string
	};

	render() {
		const {
		location,
		name,
		url,
		type
		} = this.props;

		let modalContent;

		if (type === "url") {
			const height = (document.body.clientHeight*0.8)+'px';
			const width = (document.body.clientWidth*0.9)+'px';
			modalContent = <iframe frameBorder="0" title={name} width={width} height={height} src={url}></iframe>
		} else {
			modalContent = <img id="modalImg" src={url} alt={name}/>
		}

		return (
			<div>
				<strong>{location}</strong> {name}<br />
				<button className="infowindowbutton" type="button" onClick={() => {
					ModalManager.show(modalContent,type);
				}}>{url}</button>
			</div>
		)
	}
}
