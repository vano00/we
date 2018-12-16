import { put } from 'redux-saga/effects';

import axios from '../../axios-webcams';
import * as actions from '../actions/index';

export function* fetchWebcamsSaga(action) {
	try {
		const response = yield axios.get(action.params)
		const fetchedWebcams = response.data.result.webcams;
		yield put(actions.fetchWebcamsSuccess(fetchedWebcams));
	} catch (error) {
		console.log('Error saga:',error);
	}
};
