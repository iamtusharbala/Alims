const express = require('express');
const router = express.Router();
const Book = require('../models/books');



//Getting all books 
router.get("/", async (req, res) => {
    try {
        const fetchBooks = await Book.find();
        if (fetchBooks) {
            res.render('books', { fetchBooks, 'title': 'Alims - Books' })
            // res.status(200).send(fetchBooks);
        }
    } catch (error) {
        console.log(error);
    }
})


//Creating new books
router.post("/", async (req, res) => {
    try {
        const { title, author, publishYear, imageURL } = req.body;
        const newAuthor = await Book.create({
            title, author, publishYear, imageURL
        })
        await newAuthor.save().then((result) => {
            res.redirect('/books')
        }).catch((e) => {
            res.status(400).send(e);
        })
    } catch (error) {
        console.log(error);
    }
})


router.get("/add", (req, res) => {
    res.render('createBook', { 'title': 'Alims - New Book' })
})


//Get a particular book
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const fetchBook = await Book.findById(id);
        if (fetchBook) {
            res.render('show', { fetchBook, 'title': fetchBook.title })
        }
    } catch (error) {
        console.log(error);
    }
})



router.get("/edit/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const fetchBook = await Book.findById(id);
        if (fetchBook) {
            res.render('update', { fetchBook, 'title': 'Update Book' })
        }
    } catch (error) {
        console.log(error);
    }
})

//Update a particular book
router.patch("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, publishYear, imageURL } = req.body;
        const fetchBook = await Book.findByIdAndUpdate(id, { title, author, publishYear, imageURL }, { new: true });
        if (fetchBook) {
            res.status(200).send(fetchBook);
            res.redirect('/books')
        }
    } catch (error) {
        console.log(error);
    }
})


//Delete a particular book
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const fetchBook = await Book.findByIdAndDelete(id);
        if (fetchBook) {
            res.status(200).send({ "message": "Book deleted successfully" });
        }
        else {
            res.status(404).send({ "message": "Book not found" });
        }
    } catch (error) {
        console.log(error);
    }
})


module.exports = router;