
const conf = require('../config/authConfig')

function obtenerNumerosDeCadena(cadena) {
    const numerosEncontrados = cadena.match(/\d+/g); // Expresión regular para encontrar los números en la cadena
    return numerosEncontrados ? numerosEncontrados.join('') : '';
  }
module.exports ={
    tokenInfo(req,res){ 
        res.status(200).json({
            expires: obtenerNumerosDeCadena(conf.expires),
            type:'days'
        })
    }
}