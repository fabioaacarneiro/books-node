const express = require("express")
const router = express.Router()

const Author = require("../models/Author")
const Book = require("../models/Book")

router.post("/books/insertbook", async (req, res) => {
    const { title, pageqty, authorName, publisher, country } = req.body

    const author = await Author.create({ name: authorName, publisher, country })

    if (!author) {
        console.log("Erro ao criar o autor.")
    }

    await Book.create({ title, pageqty, authorId: author.id })
    res.redirect("/")
})

module.exports = router