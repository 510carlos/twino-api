import express from 'express';

import { 
    listAllLocations,
    addLocation,
    listALocation,
    removeLocation,
    updateLocation
} from './location.helpers.js';

const router = express.Router();

router.get("/", listAllLocations);
router.post("/", addLocation);
router.get("/:id", listALocation);
router.delete("/:id", removeLocation);
router.patch("/:id", updateLocation);

export default router;