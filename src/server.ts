import express from 'express'
import router from './router'
import db from './config/db'
import colors from 'colors'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec,{swaggerUiOptions} from './config/swagger'
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

// leer datos de formularios
server.use(express.json())

server.use('/api/products',router)

//DOCS
server.use('/docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec,swaggerUiOptions))


export default server