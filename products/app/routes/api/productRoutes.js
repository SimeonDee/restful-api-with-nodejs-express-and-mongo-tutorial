const Product = require('../../models/Product');
const router = require('express').Router();
//const ObjectID = require('mongoose').ObjectID();

// Get all products
router.get('/', async (req, res) => {
    try{
        const products = await Product.find();
        //console.log(`products = ${JSON.stringify(products)}`);
        res.json({ 'products': products });

    } catch (err) {
        res.status(500).json({ message: err.message});
    } 
});

// Create new product
router.post('/', async (req, res) => {
    const product = new Product({ 
        category: req.body.category,
        name: req.body.name,
        description: req.body.description,
        image_url: req.body.image_url,
        price: req.body.price,
    });

    try{
        const newProduct = await product.save();
        res.status(201).json({ product: newProduct });

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
    
});

// Get One Product
router.get('/:id', getProduct, (req, res) => {
    res.json({ product: res.product });
});

// Update One Product
router.patch('/:id', getProduct, async (req, res) => {
    let updatedProduct;
    try{
        if(req.body.name){
            res.product.name = req.body.name;
        }

        if(req.body.category){
            res.product.category = req.body.category;
        }

        if(req.body.description){
            res.product.description = req.body.description;
        }

        if(req.body.image_url){
            res.product.image_url = req.body.image_url;
        }

        if(req.body.price){
            res.product.price = req.body.price;
        }

        updatedProduct = await res.product.save();

        res.json({ product: updatedProduct });
    } catch (err){
        res.status(400).json({ message: err.message })
    }
});

// Delete One Product
router.delete('/:id', getProduct, async (req, res) => {
    try{
        await res.product.remove();
        res.json({ message: 'Deleted product'})

    } catch (err){
        res.status(500).json({ message: err.message })
    }
});

// Middleware for finding product
async function getProduct(req, res, next){
    let product;
    try{
        //const id = new ObjectID(req.params.id);
        const id = req.params.id;
        product = await Product.findById(id);

        if(product == null){
            res.status(404).json({ message: `Product ${id} not found.` })
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

    res.product = product;
    next();
}

module.exports = router;
    