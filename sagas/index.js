import { call, put, takeEvery } from "redux-saga/effects";
import { INIT_SERVER, INIT_DATABASE, INIT_BOT } from "../actions/index.js";
import { setupServer } from "../server";
import { connectToDatabase } from "../database";
import { initializeBot } from "../bot";

function* initServerSaga() {
  yield call(setupServer);
  // ... handle side effects, e.g., logging
}

function* initDatabaseSaga() {
  yield call(connectToDatabase);
  // ... handle side effects
}

function* initBotSaga() {
  yield call(initializeBot);
  // ... handle side effects
}

function* rootSaga() {
  yield takeEvery(INIT_SERVER, initServerSaga);
  yield takeEvery(INIT_DATABASE, initDatabaseSaga);
  yield takeEvery(INIT_BOT, initBotSaga);
}

export default rootSaga;
