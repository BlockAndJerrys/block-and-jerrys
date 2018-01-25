const io = require('socket.io')(8081);


io.on('connection', function (socket) {
	console.log("Connected!");
})

const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(4000, () => console.log('Example app listening on port 4000!'))
