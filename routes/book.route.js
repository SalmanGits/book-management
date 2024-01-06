const express = require('express')
const router = express.Router()
const { createBook, unpublishBook, getBooksOfUser, getAllBooks, searchBooks } = require("../controllers/book.controllers.js")
const { addBookValidator } = require('../validators/bookValidator.js')
const verifyToken = require('../auth/auth.js')

router.post("/publish", verifyToken, addBookValidator, createBook)
router.put("/unpublish/:bookId", verifyToken, unpublishBook)
router.get("/user", verifyToken, getBooksOfUser)
router.get("/search", verifyToken, searchBooks)
router.get("/published", verifyToken, getAllBooks)


module.exports = router