import { INIT_SERVER, INIT_DATABASE, INIT_BOT } from "../actions/index.js";

const initialState = {
  serverInitialized: false,
  databaseInitialized: false,
  botInitialized: false,
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case INIT_SERVER:
      return { ...state, serverInitialized: true };
    case INIT_DATABASE:
      return { ...state, databaseInitialized: true };
    case INIT_BOT:
      return { ...state, botInitialized: true };
    default:
      return state;
  }
}

export default appReducer;
