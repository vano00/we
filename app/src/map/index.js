import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import Utils from '../helpers/utils';
import MarkerContent from '../marker-content';

export default class MyMap extends Component {
	constructor(props) {
		super(props);
		this.webcamList = this.webcamList.bind(this);
		this.locateMe = this.locateMe.bind(this);
		this.renderMyPosition = this.renderMyPosition.bind(this);
		// this.updateMapCenter = this.updateMapCenter.bind(this);
		this.state = {
			center: {
				lat: 51.505,
				lng: -0.09
			},
			zoom: 3,
			webcam: [],
			webcamsLoaded: false,
			locateMe: false,
			myPosition: {}
		}
	}

	componentDidMount() {
		this.webcamList();
	}

	locateMe(){
		Utils.getCurrentPosition().then((position) => {
			if (position) {
				this.setState({myPosition: position});
				this.setState({locateMe: true});
			} else {
				alert("It's not possible to locate you");
			}
		})
	}

	renderMyPosition() {
		const myPosition = this.state.myPosition;
		const myIcon = L.icon({
			iconUrl: 'https://image.flaticon.com/icons/svg/608/608671.svg',
			iconSize: [40, 40],
		});

		this.updateMapCenter(myPosition, 10);

		return (<Marker position={myPosition} icon={myIcon}>
					<Popup>
						You are here my friend!
					</Popup>
				</Marker>)
	}

	updateMapCenter(position, zoom) {
		const newPosition = position;
		const newzoom = zoom;

		console.log(newPosition, newzoom);
		this.setState({center: newPosition}, {newzoom: zoom});
	}

	webcamList() {
		return fetch('http://localhost:8000/api/webcams')
			.then(result=>result.json())
			.then(webcam=>this.setState({webcam}))
			.then(this.setState({webcamsLoaded: true}))
	}

	renderMarker(item, index) {
		const position = {
			lat: item.latitude,
			lng: item.longitude
		};

		const {
			location,
			name,
			url,
			type,
			id
		} = item;

		const myIcon = L.icon({
			iconUrl: 'https://image.flaticon.com/icons/svg/149/149060.svg',
			iconSize: [40, 40],
		});

		return (
			<Marker position={position} icon={myIcon} key={id}>
				<Popup>
					<MarkerContent
						location={location}
						name={name}
						url={url}
						type={type}
					/>
				</Popup>
			</Marker>
			)
	}

	renderMarkers() {
		return this.state.webcam.map(this.renderMarker);
	}

	render() {
		const {
			center,
			webcamsLoaded,
			locateMe,
			zoom
		} = this.state;

		return (
			<Map center={center} zoom={zoom} ref={this.saveMapRef}>
				<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
				/>
				{webcamsLoaded && this.renderMarkers()}
				{locateMe && this.renderMyPosition()}
			</Map>
		);
	}
}
