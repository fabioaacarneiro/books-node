const { DataTypes } = require("sequelize")

const db = require("../db/connection")

const Author = db.define("authors", {
    name: {
        type: DataTypes.STRING,
        required: true,
    },
    country: {
        type: DataTypes.STRING,
        required: true,
    },
    publisher: {
        type: DataTypes.STRING,
        required: false,
    }
})

module.exports = Author