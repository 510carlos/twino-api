import {
    getAllLocations, 
    insertLocation, 
    getLocation,
    deleteLocation,
    patchLocation
} from './location.service.js';

export const listAllLocations = async (req, res) => res.send(await getAllLocations());
export const addLocation = async (req, res) => res.send(await insertLocation(req.body));
export const listALocation = async (req, res) => res.send(await getLocation(req.params.id));
export const removeLocation = async (req, res) => res.send(await deleteLocation(req.params.id));
export const updateLocation = async (req, res) => res.send(await patchLocation(req.body));