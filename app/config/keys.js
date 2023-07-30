require('dotenv').config();

keys = {
    database:{
        host: process.env.MYSQLDB_HOST,
        user: process.env.MYSQLDB_USER,
        password:process.env.MYSQLDB_ROOT_PASSWORD,
        database:process.env.MYSQLDB_DATABASE,
        port:process.env.MYSQLDB_PORT
         // port:process.env.MYSQLDB_LOCAL_PORT
    }
}

module.exports = keys