import {
    getAllLocations, 
    insertLocation, 
    getLocation,
    deleteLocation,
    patchLocation
} from './location.service.js';

const listAllLocations = async (req, res) => {
    let result = await getAllLocations();
    res.send(result);
}

const addLocation = async (req, res) => {
    let result = await insertLocation(req.body);
    res.send(result);
}

const listALocation = async (req, res) => {
    let result = await getLocation(req.params.id);
    res.send(result);
}

const removeLocation = async (req, res) => {
    let result = await deleteLocation(req.params.id);
    res.send(result);
}

const updateLocation = async (req, res) => {
    let result = await patchLocation(req.body)
    res.send(result)
}

export {listAllLocations, addLocation, listALocation, removeLocation, updateLocation};