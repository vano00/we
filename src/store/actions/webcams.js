import * as actionTypes from './actionTypes';

export const fetchWebcamsStart = () => {
	return {
		type: actionTypes.FETCH_WEBCAMS_START
	}
}

export const fetchWebcamsSuccess = (webcams) => {
	return {
		type: actionTypes.FETCH_WEBCAMS_SUCCESS,
		webcams: webcams
	}
}

export const fetchWebcamsFailed = (error) => {
	return {
		type: actionTypes.FETCH_WEBCAMS_FAILED,
		error: error
	}
}

export const fetchWebcams = () => {
	return {
		type: actionTypes.FETCH_WEBCAMS,
	}
};
