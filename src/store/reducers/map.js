import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
	ne_lng: null,
	sw_lat: null,
	sw_lng: null,
	ne_lat: null,
	zoom: 6,
	center: {
		lat: 43.33017262373211,
		lng: 21.432266235351566
	},
};

const updateMapProps = (state, action) => {
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
