"use strict"

require('dotenv').config()

const router = require('./routes/index.js')
const errorHandler = require('./middlewares/errorHandler.js')
const cors = require('cors')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(router)
app.use(errorHandler)

io.on('connection', client => {
    console.log('Another client connected to server!')
    client.on('connection', data => {
        client.broadcast.emit('realtime-data', data)
    })
    // client.on('connection', fromClient => {
    //     console.log('Connected!', fromClient)
    // })
});

server.listen(PORT, console.log(`Server live at port ${PORT}!`))