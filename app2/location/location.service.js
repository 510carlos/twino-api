import { v4 as uuid } from 'uuid';
import {query} from '../utilities/database.js'

// const getPromise = async () => {
//   let promise = new Promise((resolve, reject) => {
//       setTimeout(() => resolve("done!"), 1000)
//     });

//   let result = await promise;

//   return result;
// }

const getAllLocations = async () => {
  let statement = `SELECT * FROM locations`;

  let result = await query({
    statement
  });

  return result;
}

const insertLocation = async (body) => {
  let data = {
    id: uuid(),
    drink: body.drink,
    zone: body.zone,
    country: body.country,
    city: body.city,
    note: body.note
  }

  let statement = `INSERT INTO locations (id, drink, zone, country, city, note) 
                VALUES (?,?,?,?,?,?)`;
  let values = [data.id, data.drink, data.zone, data.country, data.city, data.note];
  let result = await query({
    statement,
    values
  });

  return result
}

const getLocation = async (locationID) => {
  const statement = `SELECT * FROM locations WHERE id=?`;
  const values = [locationID];
  let result = await query({
    statement,
    values
  });

  return result;
}

const deleteLocation = async (locationID) => {
  let statement = `DELETE FROM locations WHERE id = ?`;
  let values = [locationID];
  let result = await query({
    statement,
    values
  });

  return result;
}

const patchLocation = async (body) => {
  let data = {
    id: body.id,
    drink: body.drink,
    zone: body.zone,
    country: body.country,
    city: body.city,
    note: body.note
  }

  let statement = `UPDATE locations
        SET drink = ?, zone = ?, country = ?, city = ?, note = ?
        WHERE id = ?`;
  let values = [data.drink, data.zone, data.country, data.city, data.note, data.id];

  let result = await query({
    statement,
    values
  });

  return result;

}

export { getAllLocations, insertLocation, getLocation, deleteLocation, patchLocation };