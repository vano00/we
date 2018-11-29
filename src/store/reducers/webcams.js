import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
	webcams: [],
	loading: false,
};

const fetchWebcamsStart = (state, action) => updateObject(state, { loading: true });
const fetchWebcamsSuccess = (state, action) => updateObject(state, { webcams: action.webcams, loading: false });
const fetchWebcamsFailed = (state, action) => updateObject(state, { loading: false });


const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_WEBCAMS_START: return fetchWebcamsStart(state, action);
		case actionTypes.FETCH_WEBCAMS_SUCCESS: return fetchWebcamsSuccess(state, action);
		case actionTypes.FETCH_WEBCAMS_FAILED: return fetchWebcamsFailed(state, action);
		default: return state;
	}
};

export default reducer;