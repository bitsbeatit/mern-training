require('dotenv').config(/*{path:path.resolve(process.cwd(), '.env')}*/)
const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const router = require('./lib/routes');

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//port fetched from .env
const port = process.env.PORT

const MongoClient = require('mongodb').MongoClient;
(async () => {
    const client = await MongoClient.connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`, {useUnifiedTopology: true})
    app.db = client.db(process.env.MONGO_DB);
})();

app.use((req, res, next) => {
    if (app.db) {
        req.db = app.db;
    }

    next();
});
// app.get('/get-record', (req, res) => {
//     console.log('getting data')
//     const data = app.db.collection('posts').find({}).toArray(function (err, docs) {
//         res.send(docs)
//     })
// })
//
// app.post('/save-record', (req, res) => {
//     console.log('saving data', req.body)
//     const record = app.db.collection('posts').insertMany([{
//         name: req.body.name,
//         roll: req.body.roll
//     }], function (err, result) {
//         res.send('saved data')
//     })
//
// })
//
// app.post('/delete-record', (req, res) => {
//     console.log('deleting data', req.body)
//     const record = app.db.collection('posts').deleteOne({
//         roll: req.body.roll
//     }, function (err, result) {
//         res.send('deleted data')
//     })
// })
//
// app.post('/update-record', (req, res) => {
//     console.log('updating data', req.body)
//     const record = app.db.collection('posts').updateMany({roll: req.body.roll}
//         , {$set: {name: req.body.name}}, function (err, result) {
//             res.send('record updated')
//         });
// })

router.init(app);

app.listen(port, () => {
    console.log(`mern training backend app running at http://localhost:${port}`)
})