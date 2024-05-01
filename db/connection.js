const { Sequelize } = require("sequelize")

require("dotenv").config()

const host = process.env.HOST
const user = process.env.USER
const password = process.env.PASSWORD
const database = process.env.DATABASE
const dialect = process.env.DIALECT

const sequelize = new Sequelize(database, user, password, {
    host: host,
    dialect: dialect
})

try {
    sequelize.authenticate()
    console.log("Conectado com sucesso ao banco de dados")
} catch (error) {
    console.log("Não foi possível conectar: ", error)
}

module.exports = sequelize