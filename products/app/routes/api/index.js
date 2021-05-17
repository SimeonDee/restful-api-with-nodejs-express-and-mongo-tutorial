const productRoutes = require("./productRoutes");
const bookRoutes    = require('./bookRoutes');

module.exports = (app) => {
    productRoutes(app);
    bookRoutes(app);
}
