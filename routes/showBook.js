const express = require("express")
const router = express.Router()

const Author = require("../models/Author")
const Book = require("../models/Book")

router.get("/books/:id", async (req, res) => {
    const id = req.params.id
    const book = await Book.findOne({ raw: true, where: { id: id } })
    const author = await Author.findOne({ raw: true, where: { id: book.authorId } })

    console.log(book)
    console.log(author)

    if (!book) {
        console.log("Livro não encontrado.")
        return
    }
    console.log(book)
    res.render("book", { book, author })
})

module.exports = router