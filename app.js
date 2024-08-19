
const express = require('express')
require('dotenv').config()
const app = express()
const cors = require('cors')
const {connectToDatabase} = require('./database/DbConnection')
const router = require('./routes/router')
connectToDatabase()
app.use(cors({
    origin: "*"
}))
app.use(express.json())

app.use(router)

app.listen(process.env.PORT,()=> {
    console.log(`Server running on Port ${process.env.PORT} !!!`)
})

