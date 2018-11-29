import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { fetchWebcamsSaga } from './webcams';

export function* watchWebcams() {
	yield takeEvery(actionTypes.FETCH_WEBCAMS, fetchWebcamsSaga);
}
