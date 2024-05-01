const express = require("express")
const homeRouter = require("./home")
const insertBookRouter = require("./insertBook")
const editBookRouter = require("./editBook")
const deleteBookRouter = require("./deleteBook")
const showBookRouter = require("./showBook")

const router = express.Router()

router.use(homeRouter)
router.use(insertBookRouter)
router.use(editBookRouter)
router.use(deleteBookRouter)
router.use(showBookRouter)

module.exports = router