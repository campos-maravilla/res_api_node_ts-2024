import { Request,Response } from "express"
import Product from "../models/Product.model"
import { check,validationResult } from "express-validator"


export const createProduct=async(req:Request,res:Response)=>{
   //const product=new Product(req.body)
   // validación
   await check('name')
   .notEmpty().withMessage('El nombre del producto no puede ir vacio')
   .run(req)
   await check('precio')
   .isNumeric().withMessage('Valor no válido')
   .notEmpty().withMessage('El precio del producto no puede ir vacio')
   .custom(value=>value>0).withMessage('Precio no válido')
   .run(req)
   
   let errors=validationResult(req)
   if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
   }
   
   const product=await Product.create(req.body)
  //const saveProduct=await  product.save()
   
    res.json({data:product})
}