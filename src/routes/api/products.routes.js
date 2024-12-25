const router = require('express').Router();

const { getAllProducts, createProduct, updateProduct, removeProduct, getByDepartment, getByPrice } = require('../../controllers/products.controller');
const { checkToken } = require('../../utils/middleware');

router.get('/', getAllProducts)
router.get('/dpt/:department', getByDepartment)
router.get('/price', getByPrice)

router.post('/', checkToken,createProduct)
router.put('/:productId', checkToken, updateProduct)
router.delete('/:productId', checkToken, removeProduct)

module.exports = router;