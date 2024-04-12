import { Router } from "express"
import { createProduct, getProductById, getProducts } from "./handlers/product"
import { body ,param} from "express-validator"
import { handleInputErrors } from "./middleware"

const router=Router()

//routing
router.get('/',getProducts)
router.get('/:id',
param('id').isInt().withMessage('ID no vàlido'),
handleInputErrors,
getProductById
)

router.post('/',
 // validación
 body('name')
 .notEmpty().withMessage('El nombre del producto no puede ir vacio'),
 body('price')
 .isNumeric().withMessage('Valor no válido')
 .notEmpty().withMessage('El precio del producto no puede ir vacio')
 .custom(value=>value>0).withMessage('Precio no válido'),
 handleInputErrors,
createProduct
)

router.put('/',(req,res)=>{
    res.json('Desde PUT')
})

router.delete('/',(req,res)=>{
    res.json('Desde DELETE')
})

export default router