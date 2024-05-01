const express = require("express")
const router = express.Router()

const Author = require("../models/Author")
const Book = require("../models/Book")

router.post("/books/delete/:id", async (req, res) => {
    const id = req.params.id
    const book = await Book.findByPk(id)
    if (!book) {
        console.log("Livro não encontrado.")
        return
    }
    const author = await Author.findByPk(book.authorId)
    if (!author) {
        console.log("Author não encontrado.")
        return
    }
    book.destroy()
    author.destroy()
    res.redirect("/");
})

module.exports = router