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
    },


      //TODO Falta hacer el update (Cambiar contraseña)
       async updatePassword(req,res){
        let passwordencript;
        if(req.body.password){
            passwordencript = bcrypt.hashSync(req.body.password, +authConfig.rounds) //? El mas lo tranforma en número
        }
        // let user:UserI;
        console.log(req.body)
        //? Decodifico el jwt
        jwt.verify(req.headers.authorization?.split(' ')[1],authConfig.secret,
            (err,decoded)=>{
                //? Actualizo el usuario
                let resul = req.body;
                if(req.body.password){
                    resul.password = passwordencript;
                }
                // console.log(resul)
                // console.log(decoded.user)
                Usuario.update(resul,{where:{id:decoded.user.id}})
                .then((newUser)=>{
                        res.status(200).json({msg:"Se ha actualizado con éxito"})
                    }).catch((err)=>{
                        console.log(err)
                        res.status(500).json(err)
                    })
            }
        )
    },

    async refreshToken(req,res){
        let refreshToken = req.headers.authorization?.split(' ')[1] ;

        //?Si no existe el token
        if(!refreshToken){
            res.status(400).json({msg:"Algo ha ido mal en el refresh del token"})       
        }
        let userfind;
        try{
            const verifyResult = jwt.verify(refreshToken,authConfig.secret);
            const {user} = verifyResult;
            userfind = await Usuario.findByPk(user.id);
        }catch(error){
            return res.status(500).json({msg:"Algo ha ido mal en buscar al usuario de refrescar",error:error,token:refreshToken})
        }
        const token = jwt.sign({user:userfind},authConfig.secret,{ expiresIn:authConfig.expires})
        res.status(200).json({token:token})

    }
}