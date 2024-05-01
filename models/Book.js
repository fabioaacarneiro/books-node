const { DataTypes } = require("sequelize")
const db = require("../db/connection")

const Book = db.define("books", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        require: true,
        allowNull: false,
    },
    pageqty: {
        type: DataTypes.NUMBER,
        allowNull: false,
        require: true,
    }
}, {
    timestamps: false
})

module.exports = Book