import mysql from 'mysql2';

import {
    DB_USER,
    DB_PASS,
    DB_HOST,
    DB_NAME,
    DB_SOCKET_PATH
} from './constants.js'

const config = {
    user: DB_USER,
    password: DB_PASS,
    host: DB_HOST,
    database: DB_NAME
};

const configSocket = {
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    socketPath: DB_SOCKET_PATH
};

export const dbQuery = async (params) => {
    let pool;
    if(process.env.DB_HOST) 
        pool = mysql.createPool(config);
    else
        pool = mysql.createPool(configSocket);
    
    const promisePool = pool.promise();

    let values = params.hasOwnProperty('values') ? params.values : [];
    
    try {
        let [rows, fields] = await promisePool.query(params.statement, values);
        return rows;
    } catch (error) {
        console.error("errroror: "+error)
    }

    pool.releaseConnection(promisePool);
}