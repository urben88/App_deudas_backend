const { Usuario } = require('../db/models/index');

module.exports = {
     prueba(req,res){
        try{
            res.json({
                msg:'controlador de prueba'
            })
        }catch(err){
            console.log(err)
        }
        console.log('controlador prueba')
    },
    
    async create(req,res){
        try{
            console.log(req.body)
            const newObj = await Usuario.create(req.body)
            
            res.status(200).json(newObj)
    
        }catch(error){
            res.status(500).json({error,msg:"Error al crear usuario"})
        }
    }
}