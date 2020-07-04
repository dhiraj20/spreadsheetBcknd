require('./config/config');
// require('./db');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'MEANStackDB';

const app = express();

// middleware
app.use(bodyParser.json());
app.use(cors());

let db;

// Use connect method to connect to the server
MongoClient.connect(process.env.MONGODB_URI, function(err, client) {
  console.log("Connected successfully to server");
  db = client.db(dbName);
});

app.get('/', function(req, res) {
    res.send('welcome');
});

app.get('/sheet', function(req, res) {
    db.collection('sheets').find().toArray((err, result) => {
        if (err) return res.send(err);
        res.status(200).send(result)
	})
});

app.post('/sheet', function(req, res) {
    db.collection('sheets').insertMany(req.body, (err, result) => {
		if (err) return res.send(err);
        res.status(200).send(result)
	})
});


// start server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port : ${process.env.PORT}`);
});
