import { Router } from "express"
import { createProduct } from "./handlers/product"
createProduct
const router=Router()

//routing
router.get('/',(req,res)=>{
    res.json('Desde GET')
})

router.post('/',createProduct)

router.put('/',(req,res)=>{
    res.json('Desde PUT')
})

router.delete('/',(req,res)=>{
    res.json('Desde DELETE')
})

export default router