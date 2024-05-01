const path = require("path")
const express = require("express")
const exphbs = require("express-handlebars")
const conn = require("./db/connection")
const router = require("./routes/router")

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

app.use(router)

conn.sync().then(() => {
    app.listen(3000)
}).catch((error) => console.log(error))
