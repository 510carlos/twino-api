import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv"
import { locationRouter } from './location/index.js'
import { getLocations } from './location/location.helpers.js'

dotenv.config()

const app = express();
const PORT = process.env.APP_PORT;



app.use(bodyParser.json());

app.use("/location", locationRouter);
app.get("/", getLocations);

app.listen(PORT, () => 
    console.log(`Server running on port: http://localhost:${PORT}`)
);