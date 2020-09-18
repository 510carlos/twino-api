import dotenv from "dotenv";

dotenv.config();

export const URL_BASE = "/api";
export const STATIC_PATH = "/Users/carlosmendoza/Documents/code/carlos-git/5-pm-somewhere/build";
// export const STATIC_PATH = "../5-pm-somewhere/build";
export const PORT = 5000;
export const G_OAUTH_CALLBACK_URL = process.env.G_OAUTH_CALLBACK_URL;
export const G_OAUTH_CLIENT_ID = process.env.G_OAUTH_CLIENT_ID;
export const G_OAUTH_CLIENT_SECRET = process.env.G_OAUTH_CLIENT_SECRET;