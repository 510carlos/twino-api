import { v4 as uuid } from 'uuid';
import { dbConnect } from "../app/database.js"
import { supportedCities } from './location.fixtures.js';

const addDataToDB = (req, res) => {
    // console.log("addDataToDB");

    res.send([]);
    return 0;

    for(var i = 0; i < supportedCities.length; i++) {
        // console.log(i);
        const body = supportedCities[i];
        let data = {
            id: uuid(),
            drink: body["drink"],
            zone: body["timezone"],
            country: body["country"],
            city: body["city"],
            note: body["note"],
            name: body["name"]
        }
        let statment = `INSERT INTO locations (id, name, drink, zone, country, city, note) 
                VALUES (?,?,?,?,?,?,?)`;
        let values = [data.id, data.name, data.drink, data.zone, data.country, data.city, data.note];

        // console.log(values);
        dbConnect({
            statment,
            values
        }, function(err, results){
            // res.send(data);
            console.log(data);
        });

        // break;
    }
    res.send([]);
};

const getLocations = (req, res) => {
    let statment = `SELECT * FROM locations`;

    dbConnect({
        statment
    }, function(err, results){
        res.send(results);
    });

}

const createLocation = (req, res) => {
    const body = req.body;
    
    let data = {
        id: uuid(),
        drink: body.drink,
        zone: body.zone,
        country: body.country,
        city: body.city,
        note: body.note
    }

    let statment = `INSERT INTO locations (id, drink, zone, country, city, note) 
                VALUES (?,?,?,?,?,?)`;
    let values = [data.id, data.drink, data.zone, data.country, data.city, data.note];
    
    dbConnect({
        statment,
        values
    }, function(err, results){
        res.send(data);
    });
} 

const getLocation = (req, res) => {
    let statment = `SELECT * FROM locations WHERE id=?`;
    let values = [req.params.id];
    dbConnect({
        statment,
        values
    }, function(err, results){
        res.send(results[0]);
    });
}

const deleteLocation = (req, res) => {
    let statment = `DELETE FROM locations WHERE id = ?`;
    let values = [req.params.id];
    dbConnect({
        statment,
        values
    }, function(err, results){
        res.send(results);
    });
};

const updateLocation = (req, res) => {
    const body = req.body;

    let data = {
        id: body.id,
        drink: body.drink,
        zone: body.zone,
        country: body.country,
        city: body.city,
        note: body.note
    }

    let statment = `UPDATE locations
           SET drink = ?, zone = ?, country = ?, city = ?, note = ?
           WHERE id = ?`;
    let values = [data.drink, data.zone, data.country, data.city, data.note, data.id];

    dbConnect({
        statment,
        values
    }, function(err, results){
        res.send(results);
    });
}

export { addDataToDB, getLocations, createLocation, getLocation, deleteLocation, updateLocation };