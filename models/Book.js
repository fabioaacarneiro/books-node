const { DataTypes } = require("sequelize")

const db = require("../db/connection")

const Author = require("./Author")

const Book = db.define("books", {
    title: {
        type: DataTypes.STRING,
        require: true,
        allowNull: false,
    },
    pageqty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        require: true,
    }
})

Book.belongsTo(Author)

module.exports = Book