require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Dbase Connection
mongoose.connect(process.env.MONGODB_URI, 
    { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => {
        console.error(`Failed connecting to database: ${error}`)
    });

db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))

const productRoutes = require('./app/routes/api/productRoutes');
const bookRoutes = require('./app/routes/api/bookRoutes');
app.use('/api/product', productRoutes);
app.use('/api/book', bookRoutes);

// app.get('/', (req, res) => {
//     return res.json({ data: req.body });
// })

// Starting the server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});