import { put } from 'redux-saga/effects';

import axios from '../../axios-webcams';
import * as actions from '../actions/index';

export function* fetchWebcamsSaga(action) {
	let webcamsIds = [];
	let webcams = [];

	webcamsIds = yield getWebcamsID(action.params);
	webcams = yield getWebcams(webcamsIds);
	yield put(actions.fetchWebcamsSuccess(webcams.filter(webcam => webcam !== undefined)));
}

function getWebcamsID(params) {
	try {
		return axios.get(params)
		.then(response => {
			return response.data.result.webcams.map(webcam => {
				return webcam.id;
			})
		})
	} catch (error) {
		console.log('Error webcams saga get IDs:',error);
		put(actions.fetchWebcamsFailed());
	}
}

function getWebcams(webcamsIds) {
	let axiosReq = webcamsIds.map(id => {
		return axios.get('list/webcam=' + id +'?lang=en&show=webcams%3Aimage%2Clocation');
	})

	return Promise.all(axiosReq).then(response => {
		return response.map(webcam => {
			return webcam.data.result.webcams[0];
		})
	}).catch(error => {
		console.log('Error webcams saga get webcams', error)
	});
}
