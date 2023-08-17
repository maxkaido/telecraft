import { call, put, takeEvery } from "redux-saga/effects";
import { INIT_SERVER, INIT_DATABASE, INIT_BOT } from "../actions/index.js";
import { setupServer } from "../server.js";
import { connectToDatabase } from "../database.js";
import { initializeBot } from "../bot.js";

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
