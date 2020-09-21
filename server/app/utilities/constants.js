import dotenv from "dotenv";

dotenv.config();

export const URL_BASE = "/api";
export const RELALTIVE_BUILD_PATH = `../client/build`;
export const PORT = process.env.APP_PORT;

export const G_OAUTH_CALLBACK_URL = process.env.G_OAUTH_CALLBACK_URL;
export const G_OAUTH_CLIENT_ID = process.env.G_OAUTH_CLIENT_ID;
export const G_OAUTH_CLIENT_SECRET = process.env.G_OAUTH_CLIENT_SECRET;

export const DB_USER = process.env.DB_USER;
export const DB_PASS = process.env.DB_PASS;
export const DB_HOST = process.env.DB_HOST;
export const DB_NAME = process.env.DB_NAME;
export const DB_SOCKET_PATH = process.env.DB_SOCKET_PATH;