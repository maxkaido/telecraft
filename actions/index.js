const INIT_SERVER = "INIT_SERVER";
const INIT_DATABASE = "INIT_DATABASE";
const INIT_BOT = "INIT_BOT";

const initServer = () => ({ type: INIT_SERVER });
const initDatabase = () => ({ type: INIT_DATABASE });
const initBot = () => ({ type: INIT_BOT });

export {
  INIT_SERVER,
  INIT_DATABASE,
  INIT_BOT,
  initServer,
  initDatabase,
  initBot,
};
