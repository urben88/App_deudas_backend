const jwt  = require("jsonwebtoken");
const authConfig =  require("../config/authConfig")
const { Usuario } = require('../db/models/index');

module.exports = (req,res,next) =>{
    console.log(req.headers)

    //?Comprobar si existe el token
    if(!req.headers.authorization){
        res.status(401).json({ msg:"Acceso no autorizado"})
    }else{
        //*Comprobar la validez del token
        let token = req.headers.authorization;
        console.log(token,'token')

        jwt.verify(token,authConfig.secret,(err, decoded) =>{

            if(err){
                res.status(500).json(err)
            }else{
               //*El decoded es el usuario del token (devuelve el objeto del usuario)
               Usuario.findOne({
                where:{id:decoded.user.id},
              }).then((user)=>{
                //Guardamos el usuario para poder usarlo en los métodos
                  req.user = user
                  next();  
               }).catch((err)=>{
                 throw ("Error en el auth middleware")
               })   
              
            }

        })


       
    }
}