import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Map as LeafletMap, TileLayer} from 'react-leaflet';

import './Map.css';
import * as actions from '../../store/actions/index';

class Map extends Component {
	constructor(props) {
		super(props);
		this.map = null;
	}

	componentDidMount() {
		this.map = this.refs.map.leafletElement;
		this.updateMapProps();
		this.getWebcams()
	}

	getWebcams() {
		const params = '/map/' + this.props.ne_lat + ',' + this.props.ne_lng + ',' + this.props.sw_lat + ',' + this.props.sw_lng + ',' + this.props.zoom;
		this.props.onFetchWebcams(params);
	}

	updateMapProps = () => {
		const newMapBounds = this.map.getBounds();
		const newMapZoom = this.map.getZoom();
		const newMapCenter = this.map.getCenter();

		this.props.onUpdateMap(newMapZoom,newMapBounds,newMapCenter);
	}

	onViewportChanged = () => {
		this.updateMapProps();
		this.getWebcams()
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
				</LeafletMap>
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
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onUpdateMap: (newMapZoom,newMapBounds,newMapCenter) => dispatch(actions.updateMapProps(newMapZoom,newMapBounds,newMapCenter)),
		onFetchWebcams: (params) => dispatch(actions.fetchWebcams(params))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
