import express from 'express';

import {
    getLocations, 
    createLocation, 
    getLocation, 
    deleteLocation, 
    updateLocation,
    addDataToDB
} from './location.helpers.js';

const router = express.Router();

router.get("/test", addDataToDB);
router.get("/", getLocations);
router.post("/", createLocation);
router.get("/:id", getLocation);
router.delete("/:id", deleteLocation);
router.patch("/:id", updateLocation);

export default router;