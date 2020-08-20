import express from 'express';

import {
    getLocations, 
    createLocation, 
    getLocation, 
    deleteLocation, 
    updateLocation
} from './location.helpers.js';

const router = express.Router();

router.get("/", getLocations);
router.post("/", createLocation);
router.get("/:id", getLocation);
router.delete("/:id", deleteLocation);
router.patch("/:id", updateLocation);

export default router;