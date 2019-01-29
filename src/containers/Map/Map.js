import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Map as LeafletMap, TileLayer, Marker, Popup} from 'react-leaflet';
import L from 'leaflet';

import './Map.css';
import * as actions from '../../store/actions/index';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Spinner from '../../components/UI/Spinner/Spinner';

class Map extends Component {
	constructor(props) {
		super(props);
		this.map = null;
	}

	componentDidMount() {
		this.map = this.refs.map.leafletElement;
		this.updateMapProps();
	}

	componentDidUpdate(prevProps) {
		if (
			prevProps.ne_lng !== this.props.ne_lng ||
			prevProps.ne_lat !== this.props.ne_lat ||
			prevProps.sw_lat !== this.props.sw_lat ||
			prevProps.sw_lng !== this.props.sw_lng) {
			this.getWebcams();
		}
	}

	getWebcams() {
		const params = '/map/' + this.props.ne_lat + ',' + this.props.ne_lng + ',' + this.props.sw_lat + ',' + this.props.sw_lng + ',' + this.props.zoom;
		this.props.onFetchWebcams(params);
	}

	renderWebcam(webcam) {
			const position = {
			lat: webcam.location.latitude,
			lng: webcam.location.longitude
			};

			const myIcon = L.icon({
				iconUrl: 'https://image.flaticon.com/icons/svg/149/149060.svg',
				iconSize: [40, 40],
			});

			// console.log('render webcam in map', webcam);

			return (
				<Marker position={position} icon={myIcon} key={webcam.id}>
					<Popup>
						{webcam.title}
					</Popup>
				</Marker>
			)
	}

	renderWebcams() {
		console.log('render webcamS in map', this.props.webcams);
		return this.props.webcams.map(webcam => this.renderWebcam(webcam));
	}

	updateMapProps = () => {
		const newMapBounds = this.map.getBounds();
		const newMapZoom = this.map.getZoom();
		const newMapCenter = this.map.getCenter();

		this.props.onUpdateMap(newMapZoom,newMapBounds,newMapCenter);
	}

	onViewportChanged = () => {
		this.updateMapProps();
	}

	render () {
		return (
			<div id="mapid">
				<LeafletMap
					ref='map'
					center={this.props.center}
					zoom={this.props.zoom}
					onViewportChanged={this.onViewportChanged}
				>
					<TileLayer
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
					/>
					{this.props.webcams.length > 0 ? this.renderWebcams() : null}
				</LeafletMap>
				<Backdrop show={this.props.loading}/>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		zoom: state.map.zoom,
		center: state.map.center,
		ne_lng: state.map.ne_lng,
		sw_lat: state.map.sw_lat,
		sw_lng: state.map.sw_lng,
		ne_lat: state.map.ne_lat,
		webcams: state.webcams.webcams.slice(0),
		loading: state.webcams.loading
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onUpdateMap: (newMapZoom,newMapBounds,newMapCenter) => dispatch(actions.updateMapProps(newMapZoom,newMapBounds,newMapCenter)),
		onFetchWebcams: (params) => dispatch(actions.fetchWebcams(params))
	}
}

// <div className="spinner" style={{height:'100%', width: '100%', position: 'absolute', top: 'calc(100% - 64px)', backgroundColor: 'black', zIndex:'1', opacity: '0.5', display: 'flex'}}>
// 	<div className="mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active" style={{margin: 'auto'}}></div>
// </div>

export default connect(mapStateToProps, mapDispatchToProps)(Map);
