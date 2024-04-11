
import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv'
dotenv.config()

//se crea la conexion de la base de datos con dbeaver
const db=new Sequelize(process.env.DATABASE_URL!,{
    models:[__dirname+'/../models/**/*.ts']
})

export default db 