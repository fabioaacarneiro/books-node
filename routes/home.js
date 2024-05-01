const express = require("express")
const router = express.Router()

const Author = require("../models/Author")
const Book = require("../models/Book")

router.get("/", async (req, res) => {
    const books = await Book.findAll({ raw: true })
    res.render('home', { books })
})

module.exports = router