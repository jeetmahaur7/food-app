import { takeEvery, put } from "redux-saga/effects";

import {
  ADD_CATEGORY,
  ADD_CATEGORY_RED,
  DELETE_CATEGORY,
  DELETE_CATEGORY_RED,
  GET_CATEGORY,
  GET_CATEGORY_RED,
  UPDATE_CATEGORY,
  UPDATE_CATEGORY_RED,
} from "../Constants";
import {
  createRecord,
  deleteRecord,
  getRecord,
  updateRecord,
} from "./Service/APICallingService";

function* createSaga(action) {
  let response = yield createRecord("category", action.payload);
  yield put({ type: ADD_CATEGORY_RED, payload: response });
}

function* getSaga(action) {
  let response = yield getRecord("category");
  yield put({ type: GET_CATEGORY_RED, payload: response });
}

function* updateSaga(action) {
  yield updateRecord("category", action.payload);
  yield put({ type: UPDATE_CATEGORY_RED, payload: action.payload });
}

function* deleteSaga(action) {
  yield deleteRecord("category", action.payload);
  yield put({ type: DELETE_CATEGORY_RED, payload: action.payload });
}

export default function* categorySagas() {
  yield takeEvery(ADD_CATEGORY, createSaga);
  yield takeEvery(GET_CATEGORY, getSaga);
  yield takeEvery(UPDATE_CATEGORY, updateSaga);
  yield takeEvery(DELETE_CATEGORY, deleteSaga);
}
