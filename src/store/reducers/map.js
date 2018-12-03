import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
	ne_lng: null,
	sw_lat: null,
	sw_lng: null,
	ne_lat: null,
	zoom: 3,
	center: {
		lat: 51.505,
		lng: -0.09
	},
};

const updateMapProps = (state, action) => {
	console.log(action.mapBounds._northEast);
	return updateObject(
		state, {
			center: action.center,
			zoom: action.zoom,
			ne_lng: action.mapBounds._northEast.lng,
			ne_lat: action.mapBounds._northEast.lat,
			sw_lng: action.mapBounds._southWest.lng,
			sw_lat: action.mapBounds._southWest.lat,
		}
	);
}


const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.UPDATE_MAP_PROPS: return updateMapProps(state, action);
		default: return state;
	}
};

export default reducer;
