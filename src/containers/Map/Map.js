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
	}

	updateMapProps = () => {
		const newMapBounds = this.map.getBounds();
		const newMapZoom = this.map.getZoom();
		const newMapCenter = this.map.getCenter();
		this.props.onUpdateMap(newMapZoom,newMapBounds,newMapCenter);
	}
	render () {
		return (
			<div id="mapid">
				<LeafletMap
					ref='map'
					center={this.props.center}
					zoom={this.props.zoom}
					onViewportChanged={this.updateMapProps}
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
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onUpdateMap: (newMapZoom,newMapBounds,newMapCenter) => dispatch(actions.updateMapProps(newMapZoom,newMapBounds,newMapCenter))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
