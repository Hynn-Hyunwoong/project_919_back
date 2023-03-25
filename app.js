const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()

app.use(cookieParser())
app.use(cors({origin:true, credentials:true}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use((req,res,next,error) =>{
    const statusCode = error.statusCode || 500
    if(statusCode >= 400){
        console.log(error.message, 'In app.js')
        return res.status(statusCode).send({error})
    }
    res.status(500).send(error.message)
})

module.exports = app