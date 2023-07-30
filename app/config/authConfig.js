require('dotenv').config();
module.exports = {
    secret: process.env.AUTH_SECRET || "trool",
    expires: process.env.AUTH_EXPIRES || "7d", //Pueden ser dias con 7d
    //Esto sirve para la encriptación
    rounds: process.env.AUTH_ROUNDS || 10
}