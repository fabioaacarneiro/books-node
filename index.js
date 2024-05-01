const path = require("path")
const express = require("express")
const exphbs = require("express-handlebars")
const conn = require("./db/connection")

const Book = require("./models/Book")

const app = express()

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.engine("handlebars", exphbs.engine({
    partialsDir: path.join(__dirname, "views/partials")
}))

app.set("view engine", "handlebars")

app.use(express.static("public"))

app.get("/", (req, res) => {
    res.render("home")
})

app.get("/books", async (req, res) => {
    const books = await Book.findAll({ raw: true })
    res.render('books', { books })
})

app.get("/books/:id", async (req, res) => {
    const id = req.params.id
    const book = await Book.findByPk(id, { raw: true })
    if (!book) {
        console.log("Livro não encontrado.")
        return
    }
    console.log(book)
    res.render("book", { book })
})

app.post("/books/insertbook", async (req, res) => {
    const title = req.body.title
    const pageqty = req.body.pageqty
    await Book.create({ title, pageqty })
    res.redirect("/books")
})

app.get("/books/edit/:id", async (req, res) => {
    const id = req.params.id
    const book = await Book.findByPk(id)
    if (!book) {
        console.log("Livro não encontrado.")
        return
    }
    res.render("editbook", { book })
})

app.post("/books/edit/:id", async (req, res) => {
    const id = req.params.id
    const title = req.body.title
    const pageqty = req.body.pageqty
    const book = await Book.findByPk(id)
    if (!book) {
        console.log("Livro não encontrado.")
        return
    }
    await book.update({ title, pageqty })
    res.redirect(`/books/${id}`)
})

app.post("/books/delete/:id", async (req, res) => {
    const id = req.params.id
    const book = await Book.findByPk(id)
    if (!book) {
        console.log("Livro não encontrado.")
        return
    }
    book.destroy()
    res.redirect("/books");
})

conn.sync().then(() => {
    app.listen(3000)
}).catch((error) => console.log(error))
