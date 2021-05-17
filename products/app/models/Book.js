const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String },
    authors: { type: [String] },
    publisher: { type: String },
    year: { type: Number },
    edition: { type: String }
});

module.exports = mongoose.model('books', bookSchema);