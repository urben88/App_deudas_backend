const express = require('express')
const usuario = require('./routes/usuarioRoutes')
const auth = require('./routes/authRoutes')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
var timeout = require('connect-timeout');
const {sequelize} = require('./db/models');
const authMiddelware = require('./middelwares/auth')
class Aplicacion {

    app
    
    constructor(){
        this.app = express();
        this.config()
        this.routing()
        this.conexiondb()
    }

    config(){
        this.app.set('port',3000)
        this.app.use(morgan('dev'))
        this.app.use(cors({
            origin:[
                'https://localhost'
            ]
        }))
        //Sirve para que el servidor puede leer objetos json en las peticiones
        this.app.use(express.json({limit: '50mb'}));
        //Sirve para enviar desde un formulario html
        this.app.use(express.urlencoded({limit: '50mb',extended:true}))
        //Sirve para que espere mas tiempo en escucha para la base de datos.
        this.app.use(timeout('120s'));
    }
    start(){
        this.app.listen(this.app.get('port'),()=>{
            console.log(`El servidor esta funcionando en el puerto ${this.app.get('port')}`)
            
        })
    }

     routing(){
        this.app.use('/api/usuario',authMiddelware,usuario)
        this.app.use('/api/auth',auth)
     }

    //? Uso el sequeleze del arhcivo de models/indes.js para hacer la conexión  a la base de datos
    async conexiondb(){
        try{
            sequelize.sync({force:true}).then(()=>{
                console.log('Nos conectamos a la db!!')
            }).catch((err)=>{
                console.log('¡¡Error al conectarse a la base de datos!!\n\n\n\n',err)
            })
        }catch(err){
            console.log("No se ha podido conectar a la base de datos")
        }
        //? Sincronizo los modelos con la base de datos
        // await sequelize.sync({force:false})
    }
}

App = new Aplicacion();
App.start();