import { v4 as uuid } from 'uuid';

let locations = [];

const getLocations = (req, res) => {
    console.log("Get location from db");
    res.send(locations);
}

const createLocation = (req, res) => {
    console.log("Creating new location")

    locations.push({...locations, id: uuid()});
} 

const getLocation = (req, res) => {
    console.log("getting a single location");

    res.send(req.params.id);
}

const deleteLocation = (req, res) => {
    console.log("deleting a location")

    // users = locations.filter((location) => location.id !== req.params.id);
};

const updateLocation = (req, res) => {
    const user = locations.find((location) => location.id === req.params.id);

    // user.username = req.body.username;
    // user.age = req.body.age;

    console.log("updating location")
}

export { getLocations, createLocation, getLocation, deleteLocation, updateLocation };