import { takeEvery, put } from "redux-saga/effects"

import { ADD_NEWSLETTER, ADD_NEWSLETTER_RED, DELETE_NEWSLETTER, DELETE_NEWSLETTER_RED, GET_NEWSLETTER, GET_NEWSLETTER_RED, UPDATE_NEWSLETTER, UPDATE_NEWSLETTER_RED } from "../Constants"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Service/APICallingService"

function* createSaga(action) {
    let response = yield createRecord('newsletter', action.payload)
    yield put({ type: ADD_NEWSLETTER_RED, payload: response })
}

function* getSaga(action) {
    let response = yield getRecord('newsletter')
    yield put({ type: GET_NEWSLETTER_RED, payload: response })
}

function* updateSaga(action) {
    yield updateRecord('newsletter', action.payload)
    yield put({ type: UPDATE_NEWSLETTER_RED, payload: action.payload })
}

function* deleteSaga(action) {
    yield deleteRecord('newsletter', action.payload)
    yield put({ type: DELETE_NEWSLETTER_RED, payload: action.payload })
}

export default function* newsletterSagas() {
    yield takeEvery(ADD_NEWSLETTER, createSaga)
    yield takeEvery(GET_NEWSLETTER, getSaga)
    yield takeEvery(UPDATE_NEWSLETTER, updateSaga)
    yield takeEvery(DELETE_NEWSLETTER, deleteSaga)
}

