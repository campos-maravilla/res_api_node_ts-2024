import { Request,Response } from "express"
import Product from "../models/Product.model"
import {validationResult } from "express-validator"


export const createProduct=async(req:Request,res:Response)=>{
   //const product=new Product(req.body)
   
   
   let errors=validationResult(req)
   if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
   }
   
   const product=await Product.create(req.body)
  //const saveProduct=await  product.save()
   
    res.json({data:product})
}