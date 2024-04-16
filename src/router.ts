import { Router } from "express"
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct, updtaeAvailability } from "./handlers/product"
import { body ,param} from "express-validator"
import { handleInputErrors } from "./middleware"

const router=Router()

/**
 * @swagger 
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:   
 *                  id:
 *                      type: integer
 *                      description: The Product ID 
 *                      example: 1
 *                  name:
 *                       type: string
 *                       description: The Product name
 *                       example: Monitor Curvo de 49 Pulgadas 
 *                  price:
 *                       type: number
 *                       description: The Product price 
 *                       example: 300
 *                  availability:
 *                       type: boolean
 *                       description: The Product availability
 *                       example: true
 */


/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get list of products
 *          tags:
 *              - Products
 *          description: Return a list of products 
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                           schema:
 *                                type: array
 *                                items:    
 *                                    $ref: '#/components/schemas/Product'     
 * 
 * 
 */
router.get('/',getProducts)
/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *      summary: Get a product by ID
 *      tags:
 *          - Products
 *      description: Return a product based on its unique ID
 *      parameters:
 *         - in: path
 *           name: id
 *           description: The ID of the product to retrieve 
 *           required: true
 *           schema:
 *                type: integer          
 *      responses:
 *          200:
 *              description: Successful Response
 *              content:
 *                  application/json:
 *                       schema:
 *                           $ref: '#/components/schemas/Product'      
 *          404:
 *              description: Not found
 *          400:
 *              description: Bad Request - Invalid ID
 * 
 * 
 * 
 */
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

router.put('/:id',
param('id').isInt().withMessage('ID no vàlido'),
body('name')
.notEmpty().withMessage('El nombre del producto no puede ir vacio'),
body('price')
.isNumeric().withMessage('Valor no válido')
.notEmpty().withMessage('El precio del producto no puede ir vacio')
.custom(value=>value>0).withMessage('Precio no válido'),
body('availability').isBoolean().withMessage('Valor para disponibilidad no vàlido'),
handleInputErrors,
updateProduct)

router.patch('/:id',
param('id').isInt().withMessage('ID no vàlido'),
handleInputErrors, 
updtaeAvailability)

router.delete('/:id',
param('id').isInt().withMessage('ID no vàlido'),
handleInputErrors, 
deleteProduct
)

export default router