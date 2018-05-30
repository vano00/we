import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import Utils from '../helpers/utils';
import MarkerContent from '../marker-content';

export default class Map extends Component {

	constructor(props) {
		super(props);
		this.GoogleMap = null;
		this.map = null;
		this.infowindow = null;
		this.saveMapRef = this.saveMapRef.bind(this);
		this.initMap = this.initMap.bind(this);
		this.onApiIsLoaded = this.onApiIsLoaded.bind(this);
		this.locateMe = this.locateMe.bind(this);
		this.webcamList = this.webcamList.bind(this);
		this.renderMarker = this.renderMarker.bind(this);
		this.stopMarkerAnimation = this.stopMarkerAnimation.bind(this);
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
				this.marker = new this.GoogleMap.Marker({
					position: this.state.center,
					map:this.map
				})
				this.marker.setAnimation(this.GoogleMap.Animation.BOUNCE);
				this.stopMarkerAnimation(this.marker, 2100);
			} else {
				alert("It's not possible to locate you")
			}
		})
	}

	stopMarkerAnimation(marker,time) {
		setTimeout(function(){ marker.setAnimation(null); }, time);
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

	createInfowindow() {
		this.infowindow = new this.GoogleMap.InfoWindow();
	}

	loadJS(src) {
		const ref = window.document.getElementsByTagName("script")[0];
		const script = window.document.createElement("script");
		script.src = src;
		script.async = true;
		script.defer = true;
		ref.parentNode.insertBefore(script, ref);
	}

	onMarkerClick(marker, item) {
		const {
			location,
			name,
			url,
			type
		} = item;

		const markerContent = (
			<MarkerContent
				location={location}
				name={name}
				url={url}
				type={type}
			/>
		);

		const markerContainer = "<div id=markerContainer></div>";
		this.infowindow.open(this.map, marker);
		this.infowindow.setContent(markerContainer);
		ReactDOM.render(markerContent, document.getElementById('markerContainer'));
	}

	renderMarker(item, index) {
		const position = {
			lat: item.latitude,
			lng: item.longitude
		};

		const icon = {
			url: 'https://image.flaticon.com/icons/svg/149/149060.svg',
			scaledSize: new this.GoogleMap.Size(40, 40),
		};

		const marker = new this.GoogleMap.Marker({
			animation: this.GoogleMap.Animation.DROP,
			position: position,
			map: this.map,
			icon: icon,
		})

		marker.addListener('click', this.onMarkerClick.bind(this, marker, item));
		this.createInfowindow();
	}

	renderMarkers() {
		return this.state.webcam.map(this.renderMarker);
	}

	render() {
		const {
			mapIsCreated,
		} = this.state;

		return (
			<div className="mapContainer">
				<div id="map" ref={this.saveMapRef} />
				{mapIsCreated && this.renderMarkers()}
			</div>
		);
	}
}
