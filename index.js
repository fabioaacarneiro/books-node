const path = require("path")
const express = require("express")
const exphbs = require("express-handlebars")
const conn = require("./db/connection")

const Author = require("./models/Author")
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

app.get("/", async (req, res) => {
    const books = await Book.findAll({ raw: true })
    res.render('home', { books })
})

app.get("/books/:id", async (req, res) => {
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

app.post("/books/insertbook", async (req, res) => {
    const { title, pageqty, authorName, publisher, country } = req.body

    const author = await Author.create({ name: authorName, publisher, country })

    if (!author) {
        console.log("Erro ao criar o autor.")
    }

    await Book.create({ title, pageqty, authorId: author.id })
    res.redirect("/")
})

app.get("/books/edit/:id", async (req, res) => {
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

app.post("/books/edit/:id", async (req, res) => {
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

app.post("/books/delete/:id", async (req, res) => {
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

conn.sync().then(() => {
    app.listen(3000)
}).catch((error) => console.log(error))
