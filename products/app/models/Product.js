const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({ 
    category: { type: String, default: 'Computer' },
    name: { type: String },
    price: { type: Number },
    description: { type: String, default: 'Nice Product' },
    image_url: { type: String },
});

module.exports = mongoose.model('products', productSchema);