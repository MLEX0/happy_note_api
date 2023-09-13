const express = require('express');
const http = require('http');

const bodyParser = require('body-parser')
const passport = require('passport')

const PORT = process.env.PORT || 80

const app = express()
const server = http.createServer(app);

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(require('morgan')('dev'))
app.use('/uploads', passport.authenticate('jwt', {session:false}) ,express.static('uploads'))

server.listen(PORT, () => {
    console.log('server started on', PORT);
})