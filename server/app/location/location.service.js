import { v4 as uuid } from 'uuid';
import {dbQuery} from '../utilities/database.js';

export const getAllLocations = async () => {
  let statement = `SELECT * FROM locations`;

  let result = await dbQuery({
    statement
  });

  return result;
}

export const insertLocation = async (body) => {
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
  let result = await dbQuery({
    statement,
    values
  });

  return result
}

export const getLocation = async (locationID) => {
  const statement = `SELECT * FROM locations WHERE id=?`;
  const values = [locationID];
  let result = await dbQuery({
    statement,
    values
  });

  return result;
}

export const deleteLocation = async (locationID) => {
  let statement = `DELETE FROM locations WHERE id = ?`;
  let values = [locationID];
  let result = await dbQuery({
    statement,
    values
  });

  return result;
}

export const patchLocation = async (body) => {
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

  let result = await dbQuery({
    statement,
    values
  });

  return result;
}