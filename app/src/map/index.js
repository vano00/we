import React, { Component } from 'react';
import WebcamList from '../webcam-list';
import Utils from '../helpers/utils';


export default class Map extends Component {

	constructor() {
		super();
		this.GoogleMap = null;
		this.mapRef = null;
		this.map = null;
		this.marker = null;
		this.saveMapRef = this.saveMapRef.bind(this);
		this.initMap = this.initMap.bind(this);
		this.onApiIsLoaded = this.onApiIsLoaded.bind(this);
		this.updatePosition = this.updatePosition.bind(this);
		this.createMarker = this.createMarker.bind(this);
		this.locateMe = this.locateMe.bind(this);
		this.state = {
			apiIsLoaded: false,
			center: {
				lat: 12.932674,
				lng: 8.311444
			},
			zoom: 4
		}
	}

	componentDidMount() {
		window.onApiIsLoaded = this.onApiIsLoaded;
		this.loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyDOOfGbdcsoynnbalomhaXg09txoQ5JWZo&callback=onApiIsLoaded');
	}

	componentDidUpdate(prevProps, prevState) {
		if(this.state.apiIsLoaded && this.map === null) {
			this.initMap();
		}
	}

	saveMapRef(ref) {
		this.mapRef = ref;
	}

	locateMe(){
		Utils.getCurrentPosition().then((position) => {
			if (position) {
				this.setState({
					zoom: 10,
					center: position
				});
				this.updatePosition();
				this.createMarker();
			} else {
				alert("Not possible to locate you")
			}
		})
	}

	createMarker() {
		this.marker = new this.GoogleMap.Marker({
			position: this.state.center,
			map:this.map
		})
	}

	updatePosition() {
		this.map = new this.GoogleMap.Map(this.mapRef, {
			zoom: this.state.zoom,
			center: this.state.center
		});
	};

	onApiIsLoaded() {
		this.GoogleMap = window.google.maps;
		this.setState({
			apiIsLoaded: true
		});
	}

	initMap() {
		this.map = new this.GoogleMap.Map(this.mapRef, {
			zoom: this.state.zoom,
			center: this.state.center
		});
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
			<div className="mapContainer">
				<div id="map" ref={this.saveMapRef} />
				<WebcamList />
				<button onClick={this.locateMe}>Locate me!</button>
			</div>
		);
	}
}
