import mysql from "mysql";
import dotenv from "dotenv"

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


export const dbConnect = (params, callback) => {
    try {
        let connection;
        if(process.env.DB_HOST) 
            connection = mysql.createConnection(config);
        else
            connection = mysql.createConnection(configSocket);

        connection.connect(function(err) {
            if (err) throw err;
        });

        if(params.hasOwnProperty('values')) {
            connection.query(params.statment, params.values, (err, results, fields) => {
                if (err) return console.error(err.message);
                return callback(err, results);
            });
            
        } else {
            connection.query(params.statment, function (error, results, fields) {
                if (error) return console.error(error.message);
                return callback(error, results);
            });
        }
        connection.end();
    } catch(e) {
        connection.end();
        console.error(e)
        throw new UserException('DB error');
    }
    
};