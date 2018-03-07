import React, { Component } from 'react';
import WebcamList from '../webcam-list';
import Utils from '../helpers/utils';


export default class Map extends Component {

	constructor() {
	super();
	this.initMap = this.initMap.bind(this);
	}

	componentDidMount() {
		window.initMap = this.initMap;
		this.loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyDOOfGbdcsoynnbalomhaXg09txoQ5JWZo&callback=initMap');
	}

	initMap() {
		const google = window.google;
		const mapEl = this.refs.map;

		const updateCenter = function(position) {
			map.setCenter(position);
		};

		const map = new google.maps.Map(mapEl, {
			zoom: 4,
		});

		Utils.getCurrentPosition().then(updateCenter);
	}

	loadJS(src) {
		const ref = window.document.getElementsByTagName("script")[0];
		const script = window.document.createElement("script");
		script.src = src;
		script.async = true;
		script.defer = true;
		ref.parentNode.insertBefore(script, ref);
	}

	render() {
		return (
			<div id="map" ref="map">
				<WebcamList />
			</div>
		);
	}
}
