import store from "./store.js";
import { initServer, initDatabase, initBot } from "./actions/index.js";

store.dispatch(initServer());
store.dispatch(initDatabase());
store.dispatch(initBot());
