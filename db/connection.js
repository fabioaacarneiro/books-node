const mysql = require("mysql")

require("dotenv").config()

const host = process.env.HOST
const user = process.env.USER
const password = process.env.PASSWORD
const database = process.env.DATABASE

module.exports = mysql.createPool({
    connectionLimit: 10,
    host: host,
    user: user,
    password: password,
    database: database,
})