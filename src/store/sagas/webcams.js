import { put } from 'redux-saga/effects';

import axios from '../../axios-webcams';
import * as actions from '../actions/index';

export function* fetchWebcamsSaga(action) {
	yield put(actions.fetchWebcamsStart());
	const webcams = [];
	try {
		yield axios.get(action.params)
		.then(response => {
			console.log('Axios response',response.data.result.webcams);
			response.data.result.webcams.map(webcam => {
				try {
					axios.get('list/webcam=' + webcam.id +'?lang=en&show=webcams%3Aimage%2Clocation')
					.then(function (webcamDetails){
						webcams.push(webcamDetails.data.result.webcams[0]);
						return webcams
					})
				}  catch (error) {
					console.log('Error fetch webcam details saga:',error);
				}
				return webcams
			})
		})
		console.log('Webcam array',webcams);
		yield put(actions.fetchWebcamsSuccess(webcams));
	} catch (error) {
		console.log('Error fetch webcams saga:',error);
		yield put(actions.fetchWebcamsFailed());
	}
};
