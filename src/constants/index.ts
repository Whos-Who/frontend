export const SOCKET_SERVER_URL =
  process.env.NODE_ENV == "development"
    ? "http://127.0.0.1:5000"
    : "https://assignment-3-web-backend.herokuapp.com";

export const MIN_PLAYERS = 3;

export const GUESS_TIME_LIMIT = 30;

export const BACKEND_URL = SOCKET_SERVER_URL;
