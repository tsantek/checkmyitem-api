const express = require('express')
const app = express()

require('dotenv').config();

app.get('/', function (req, res) {
    res.send(process.env)
})

app.listen(3001)