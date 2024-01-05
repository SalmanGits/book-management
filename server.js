require("dotenv").config()
const express = require('express');
const cors = require('cors');
const helmet = require("helmet")
const app = express()
const { connectToDb } = require("./connection/db.js");
const PORT = process.env.PORT || 4001
app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
connectToDb()
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})