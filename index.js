import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv"
import { locationRouter } from './location/index.js'

dotenv.config()

const app = express();
const PORT = process.env.APP_PORT;



app.use(bodyParser.json());

app.use("/", locationRouter);
// app.get("/", (req, res) => 
//     res.send("welcome to the  API")
// );

app.listen(PORT, () => 
    console.log(`Server running on port: http://localhost:${PORT}`)
);