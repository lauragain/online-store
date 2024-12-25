const Product = require('../models/products.model')

const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find().populate('owner', 'username email -_id')
        res.json(products)
    } catch (error) {
        next(error)
    }
}

const getByDepartment = async (req, res, next) => {
    const { department } = req.params
    try {
        const products = await Product.find({ department })
        res.json(products)
    } catch (error) {
        next()
    }
}

const getByPrice = async (req, res, next) => {
    const { min = 0, max = 4000 } = req.query
    try {
        const products = await Product.find({ 
            price: {$gte: min, $lte: max}
        })
        res.json(products)
    } catch (error) {
        next()
    }
}


const createProduct = async (req, res, next) => {
    // req.body - datos del nuevo producto
    try {
        req.body.owner = req.user._id
        const product = await Product.create(req.body)
        res.json(product)
    } catch (error) {
        next(error)
    }
}

const updateProduct = async (req, res, next) => {
    const { productId } = req.params
    try {
        const product = await Product.findByIdAndUpdate(productId, req.body, { new: true })
        res.json(product)
    } catch (error) {
        next(error)
    }
}

const removeProduct = async (req, res, next) => {
    const { productId } = req.params
    try {
        const product = await Product.findByIdAndDelete(productId)
        res.json(product)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllProducts, createProduct, updateProduct, removeProduct, getByDepartment, getByPrice
}
