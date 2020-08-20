import express from "express";
import bodyParser from "body-parser";
import { locationRouter } from './location/index.js'

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.use("/location", locationRouter);

app.get("/", (req, res) => 
    res.send("welcome to the  API")
);

app.listen(PORT, () => 
    console.log(`Server running on port: http://localhost:${PORT}`)
);