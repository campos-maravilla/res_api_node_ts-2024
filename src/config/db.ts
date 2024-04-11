
import { Sequelize } from "sequelize";
import dotenv from 'dotenv'
dotenv.config()

//se crea la conexion de la base de datos con dbeaver
const db=new Sequelize(process.env.DATABASE_URL)

export default db 