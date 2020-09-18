import locationRouter from './location/location.routes.js'
import { getLocations } from './location/location.helpers.js'
import { userRouter } from './user/user.routes.js'
import express from "express";

const apiRoutes = () => {

    const app = express();

    app.get("/api/", function (req, res) {
        res.send('hello world');
    })
    app.use("/test", getLocations);
    app.use("/api/location", locationRouter);
    
    app.use("/api/user", userRouter);

    app.get("/", (req, res) => {
        console.log("fooo")
        // res.sendFile(path.join(BUILD, "index.html"))
      }
    );
}

export default apiRoutes;