import * as actionTypes from './actionTypes';

export const updateMapProps = (newMapZoom,newMapBounds,newMapCenter) => {
	return {
		type: actionTypes.UPDATE_MAP_PROPS,
		zoom: newMapZoom,
		center: newMapCenter,
		mapBounds: newMapBounds
	}
}
