// imports
const express = require('express')
var cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require("helmet");
const logger = require('morgan');
// const config = require('./config/config.js')

// errors
const NotFoundError = require('./errors/not-found-error.js')

// middlewares
const errorHandler = require('./middlewares/error-handler.js')

// create a server
const app = express()

// cors
app.use(cors())

// security
app.use(helmet());

// logger
app.use(logger('dev'));
// app.set('trust proxy', true);


// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const db = require('./models/index.js');
// db.sequelize.sync();

// REMOVE ON THE END
db.sequelize.sync({ force: false }).then(() => {
    console.log("Drop and re-sync db.");
});

app.get('/', function (req, res) {
    res.send('Welcome to API')
})

const apiRoutes = require('./api/index.js')


// REMOVE
// require('./api/user.js')(app);
app.use('/api', apiRoutes)


app.all('*', (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler)

app.listen(3001)