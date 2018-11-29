// import { put } from 'redux-saga/effects';

import axios from '../../axios-webcams';
// import * as actions from '../actions/index';

export function* fetchWebcamsSaga(action) {
	try {
		const response = yield axios.get('list/country=ch?lang=en&show=webcams')
		console.log('response:',response);
		// const fetchedWebcams = [];
		// for (let key in response.data) {
		// 	fetchedWebcams.push({
		// 		...response.data[key],
		// 		id: key
		// 	})
		// }
		// yield put(actions.fetchWebcamsSuccess(fetchedWebcams));
	} catch (error) {
		console.log('Error saga:',error);
	}
};
