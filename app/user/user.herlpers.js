import { dbConnect } from "../database.js"

export const getAuthUsers = () => {
    let statement = `SELECT * FROM auth_users`;
    dbConnect({
        statement
    }, function(err, results) {
        console.log(results)
        // res.send()?
    })
};

export const getAuthUsers2 = (callback) => {
    let statment = `SELECT * FROM auth_users`;
    return dbConnect({
        statment
    }, callback);
}