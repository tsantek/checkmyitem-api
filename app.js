// imports
const express = require('express')
const bodyParser = require('body-parser')
const helmet = require("helmet");
// const cookieSession = require('cookie-session')

// routers
const signupRouter = require('./routers/signup.js')
const signinRouter = require('./routers/signin.js')
const signoutRouter = require('./routers/signout.js')
const currentUserRouter = require('./routers/current-user.js')

// middlewares
const errorHandler = require('./middlewares/error-handler.js')

// dotenv init
require('dotenv').config();

// create a server
const app = express()


// security
app.use(helmet());

// app.set('trust proxy', true);


// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function (req, res) {
    res.send('Welcome to API')
})

app.use(signupRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(currentUserRouter)

// app.all('*', async (req, res) => {
//     throw new NotFoundError();
// });

app.use(errorHandler)

app.listen(3001)