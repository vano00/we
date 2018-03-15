import React, { Component } from 'react';
import Utils from '../helpers/utils';
import Marker from '../marker';


export default class Map extends Component {

	constructor() {
		super();
		this.GoogleMap = null;
		this.mapRef = null;
		this.map = null;
		this.marker = null;
		this.markers = null;
		this.saveMapRef = this.saveMapRef.bind(this);
		this.initMap = this.initMap.bind(this);
		this.onApiIsLoaded = this.onApiIsLoaded.bind(this);
		this.locateMe = this.locateMe.bind(this);
		this.webcamList = this.webcamList.bind(this);
		this.state = {
			mapIsCreated: false,
			apiIsLoaded: false,
			center: {
				lat: 35.146190,
				lng: -10.938965
			},
			zoom: 3,
			webcam: [],
		}
	}

	componentDidMount() {
		this.webcamList();
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
				this.marker.setAnimation(this.GoogleMap.Animation.BOUNCE);
			} else {
				alert("It's not possible to locate you")
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
		this.map.setCenter(this.state.center)
		this.map.setZoom(this.state.zoom)
	}

	webcamList() {
		return fetch('http://localhost:8000/api/webcams')
			.then(result=>result.json())
			.then(webcam=>this.setState({webcam}))
	}

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
		this.setState({
			mapIsCreated: true
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

	renderMarker() {
		const infowindow = new this.GoogleMap.InfoWindow();
		this.markers = this.state.webcam.map((item, i) => {
			return (
				<Marker
					key={item.id}
					position={
						{
							lat: item.latitude,
							lng: item.longitude
						}
					}
					location={item.location}
					name={item.name}
					url={item.url}
					map={this.map}
					google={this.GoogleMap}
					infowindow={infowindow}
				/>
			)
		});
		return this.markers;
	}

	render() {
		const {
			mapIsCreated,
		} = this.state;
		return (
			<div className="mapContainer">
				<div id="map" ref={this.saveMapRef} />
				{mapIsCreated && this.renderMarker()}
				<button onClick={this.locateMe}>Locate me!</button>
			</div>
		);
	}
}
