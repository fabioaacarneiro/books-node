const path = require("path")
const express = require("express")
const exphbs = require("express-handlebars")
const conn = require("./db/connection")

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

app.get("/books", (req, res) => {
    const sql = "select * from books;"
    conn.query(sql, (err, data) => {
        if (err) {
            console.log(err)
            return
        }

        const books = data

        res.render('books', { books })
    })
})

app.get("/books/:id", (req, res) => {
    const id = req.params.id
    const sql = "select * from books where ?? = ?"
    const data = ["id", id]

    conn.query(sql, data, (err, data) => {
        if (err) {
            console.log(err)
        }

        const book = data[0]

        res.render("book", { book })
    })
})

app.post("/books/insertbook", (req, res) => {
    const title = req.body.title
    const pageqty = req.body.pageqty

    const sql = "insert into books (??, ??) values (?, ?);"
    const data = ["title", "pageqty", title, pageqty]

    conn.query(sql, data, (err) => {
        if (err) {
            console.log(err)
        }

        res.redirect("/books")
    })
})

app.get("/books/edit/:id", (req, res) => {
    const id = req.params.id
    const sql = "select * from books where ?? = ?"
    const data = ["id", id]

    conn.query(sql, data, (err, data) => {
        if (err) {
            console.log(err)
            return
        }

        const book = data[0]
        res.render("editbook", { book })
    })

})

app.post("/books/edit/:id", (req, res) => {
    const id = req.params.id
    const title = req.body.title
    const pageqty = req.body.pageqty

    const sql = "update books set ?? = ?, ?? = ? where ?? = ?"
    const data = ["title", title, "pageqty", pageqty, "id", id]

    conn.query(sql, data, (err, data) => {
        if (err) {
            console.log(err)
            return
        }

        const book = data[0]
    })

    res.redirect(`/books/${id}`)
})

app.post("/books/delete/:id", (req, res) => {
    const id = req.params.id

    const sql = "delete from books where ?? = ?;"
    const data = ["id", id]

    conn.query(sql, data, (err) => {
        console.log(err)
    })

    res.redirect("/books");
})

app.listen(3000)