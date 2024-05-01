const express = require("express")
const router = express.Router()

const Author = require("../models/Author")
const Book = require("../models/Book")

router.get("/books/edit/:id", async (req, res) => {
    const id = req.params.id
    const book = await Book.findByPk({ raw: true }, id)
    const author = await Author.findByPk({ raw: true }, book.authorId)

    if (!book) {
        console.log("Livro não encontrado.")
        return
    }

    if (!author) {
        console.log("Author não encontrado.")
        return
    }

    res.render("editbook", { book, author })
})


router.post("/books/edit/:id", async (req, res) => {
    const id = req.params.id
    const { title, pageqty, authorName, publisher, country } = req.body

    const book = await Book.findByPk(id)
    const author = await Author.findByPk(book.authorId)

    if (!book) {
        console.log("Livro não encontrado.")
        return
    }

    if (!author) {
        console.log("Autor não encontrado.")
        return
    }

    await book.update({ title, pageqty })
    await author.update({ name: authorName, publisher, country })

    res.redirect(`/books/${id}`)
})

module.exports = router