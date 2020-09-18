import dotenv from "dotenv"
import mysql from 'mysql2';

dotenv.config()

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME
};

const configSocket = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    socketPath: process.env.DB_SOCKET_PATH
};

export const query = async (params) => {
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