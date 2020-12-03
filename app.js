// imports
const express = require('express')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const helmet = require("helmet");

// routers
// const signinRouter = require('./routers/signin.js')
const signupRouter = require('./routers/signup.js')
// const signoutRouter = require('./routers/signout.js')
// const currentUserRouter = require('./routers/current-user.js')

// middlewares
const errorHandler = require('./middlewares/error-handler.js')

// dotenv init
require('dotenv').config();

// create a server
const app = express()

// security
app.use(helmet());

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
}));

app.get('/', function (req, res) {
    res.send('Welcome to API')
})

app.use(signupRouter)
// app.use(signinRouter)
// app.use(currentUserRouter)
// app.use(signoutRouter)

// app.all('*', async (req, res) => {
//     throw new NotFoundError();
// });

app.use(errorHandler)

app.listen(3001)