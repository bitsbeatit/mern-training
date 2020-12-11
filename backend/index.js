const path = require('path');
require('dotenv').config({path: path.join(__dirname, './.env')})
const express = require('express');
const bodyParser = require('body-parser');
const morganLogger = require('morgan');
const app = express();
const router = require('./lib/routes');

// const cors = require('cors');
// app.use(cors());
// app.options('*', cors());

app.use(morganLogger('dev'));

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//port fetched from .env
const port = process.env.PORT || 8090

const MongoClient = require('mongodb').MongoClient;
(async () => {
    //const client = await MongoClient.connect(`mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=admin`)
    const client = await MongoClient.connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`, {useUnifiedTopology: true})

    app.db = client.db(process.env.MONGO_DB);
})();

app.use((req, res, next) => {
    if (app.db) {
        req.db = app.db;
    }

    next();
});

router.init(app);

//route not found error handler
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
  });
  
  //global error handler thrown in next
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error:{
        message: error.message
      }
    });
})

app.listen(port, () => {
    console.log(`mern training backend app running at http://localhost:${port}`)
})