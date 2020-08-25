import mysql from "mysql";
import dotenv from "dotenv"

dotenv.config()

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME
};

export const dbConnect = (params, callback) => {
    try {

    
        let connection = mysql.createConnection(config);
        connection.connect();

        if(params.hasOwnProperty('values')) {
            connection.query(params.statment, params.values, (err, results, fields) => {
                if (err) return console.error(err.message);
                console.log(results);
                callback(err, results);
            });
            
        } else {
            connection.query(params.statment, function (error, results, fields) {
                if (error) return console.error(error.message);
                callback(error, results);
            });
        }
        connection.end();
    } catch(e) {
        console.log(e)
        connection.end();
    }
    
};