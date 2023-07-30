const { Usuario } = require('../db/models/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/authConfig') 

module.exports = {
    
    async login(req,res){
        let { usuario, password } = req.body;
        await Usuario.findOne({
            where: {
                usuario: usuario
            },
        }).then((User) =>{
            if(!User){
                res.status(404).json({msg: "Usuario no encontrado"})
            }else{
                if(bcrypt.compareSync(password,User.password)){
                    //Devolvemos token
                    //? Creamos el token
                    let token = jwt.sign({user:User},authConfig.secret,{
                        expiresIn : authConfig.expires
                    })
                    res.json({
                        usuario: User,
                        token: token
                    })
                }else{
                    // Unauthorized Access
                    res.status(401).json({ msg:"Contraseña incorrecta"})
                }
            }
        }).catch( (error)=>{
            res.status(500).json(error)
        })
    },

    async register(req,res){
         //? Encriptamos la contraseña
         let password = bcrypt.hashSync(req.body.password, +authConfig.rounds) //? El mas lo tranforma en número
         //*Crear un usuario
         delete req.body.password
         await Usuario.create({
            ...req.body,
            password:password
        })
         .then( (User) =>{
             // console.log('User',User.id)
             // console.log('rol',rol)
             //? Creamos el token
             let token = jwt.sign({user:User},authConfig.secret,{
                 expiresIn : authConfig.expires
             })
             res.status(200).json({msg:"Usuario creado correctamente",token:token})
         }).catch( (error) =>{
             res.status(500).json(error)
         })
    }
}