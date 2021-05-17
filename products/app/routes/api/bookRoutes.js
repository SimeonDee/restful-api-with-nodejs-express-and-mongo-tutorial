const Book = require('../../models/Book');
const router = require('express').Router();

// Get all books
router.get('/', async (req, res) => {
    try{
        const books = await Book.find();
        res.json({ books: books });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new book
router.post('/', async (req, res) => {
    let book;
    const newBook = new Book({ 
        title: req.body.title,
        authors: req.body.authors.split(", "),
        publisher: req.body.publisher,
        edition: req.body.edition,
        year: req.body.year,
    });

    try{
        book = await newBook.save();
        res.status(201).json({ book: book });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a book
router.get('/:id', getBook, (req, res) => {
    res.json({ book: res.book })
});

// Delete a book
router.delete('/:id', getBook, async (req, res) => {
    try{
        await res.book.remove();
        res.json({ message: 'Book deleted' });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a book
router.patch('/:id', getBook, async (req, res) => {
    let updatedBook;

    if(req.body.title){
        res.book.title = req.body.title;
    }

    if(req.body.authors){
        res.book.authors = req.body.authors.split(", ");
    }

    if(req.body.year){
        res.book.year = req.body.year;
    }

    if(req.body.publisher){
        res.book.publisher = req.body.publisher;
    }

    if(req.body.edition){
        res.book.edition = req.body.edition;
    }

    try{
        updatedBook = await res.book.save();
        res.json({ book: updatedBook });

    } catch (err) {
        res.status(500).json({ message: err.message })
    }

});


// Middleware for finding a book
async function getBook(req, res, next){
    let book;
    try{
        book = await Book.findById(req.params.id);

        if(!book){ // Not found
            res.status(404).json({ message: "Book not found" });
        }

    } catch (err) {
        res.status(500).json({ message: err.message });
    }

    res.book = book;
    next();
}


module.exports = router;
