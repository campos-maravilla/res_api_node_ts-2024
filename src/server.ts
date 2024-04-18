import express from 'express'
import router from './router'
import db from './config/db'
import colors from 'colors'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec,{swaggerUiOptions} from './config/swagger'
import cors,{CorsOptions} from 'cors'
import morgan from 'morgan' 

//Conectar a base de datos 
export async function connectDB(){
    try {
        await db.authenticate()
        db.sync()
        //console.log(colors.blue('Conexión exitosa a la BD'))
    } catch (error) {
       // console.log(error)
        console.log(colors.red.bold('Hubo un error al conectar  a la BD'))
    }
}

connectDB()

// Instancia de express 
const server=express()

//morgan ver los endpoint en consola
server.use(morgan('dev'))

// Permitir conexiones 
const corsOptions:CorsOptions={
    origin:function(origin,callback){
        //console.log(origin)
        if(origin===process.env.FRONTEND_URL){
          //  console.log('Permitir...')
          callback(null,true)
        }else{
           // console.log('Denegar...')
           callback(new Error('Error de CORS'))
        }
    }
}
server.use(cors(corsOptions))
// leer datos de formularios
server.use(express.json())

server.use('/api/products',router)

//DOCS
server.use('/docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec,swaggerUiOptions))


export default server