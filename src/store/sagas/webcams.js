import { put } from 'redux-saga/effects';

import axios from '../../axios-webcams';
import * as actions from '../actions/index';

export function* fetchWebcamsSaga(action) {
	try {
		const response = yield axios.get('list/country=ch?lang=en&show=webcams')
		const fetchedWebcams = response.data.result.webcams;
		// for (let key in response.data.result.webcams) {
		// 	fetchedWebcams.push({
		// 		...response.result.webcams[key],
		// 		id: key
		// 	})
		// }
		// console.log(fetchedWebcams);
		yield put(actions.fetchWebcamsSuccess(fetchedWebcams));
	} catch (error) {
		console.log('Error saga:',error);
	}
};
