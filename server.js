/**
*   ChitChat server.js facilitates the server operations, implementing routes
*   Made by mrn6 and ril2 for CS 336 at Calvin College
*
*
*/

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var MongoClient = require('mongodb').MongoClient

var APP_PATH = path.join(__dirname, 'dist');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(APP_PATH));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

MongoClient.connect('mongodb://cs336:' + process.env.MONGO_PASSWORD + '@ds153380.mlab.com:53380/cs336', function (err, client) {
    if (err) throw err;

    let db = client;
    let commentCollection = db.collection('chitchatComments');
    let topicCollection = db.collection('chitchatTopics');

    // Additional middleware which will set headers that we need on each request.
    app.use(function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');

        res.setHeader('Cache-Control', 'no-cache');
        next();
    });

    // route to get all topics in a JSON list
    app.get('/api/topics', function(req, res) {
        topicCollection.find({}).toArray(function(err, docs) {
            // console.log(docs);
            res.json(docs);
        });      
    });

    // make a new topic
    app.post('/api/topics', function(req, res) {
        // console.log(req.body);
        let newTopic = {
            id: Date.now(),
            topic: req.body.name,
        };

        topicCollection.insertOne(newTopic, function(err, result) {
            if (err) throw err;
            console.log(result);
            res.sendStatus(200);
        });

    });

    // delete a topic, and all comments in that topic
    app.delete('api/topics/:id', function(req, res) {
        let ret = {};
        topicCollection.deleteOne({id : req.params.id},
            function (err, result) {
                if (err) throw err;
                ret = result;
            });

        commentCollection.deleteMany({"topic" : req.params.id},
            function(err, result) {
                if (err) throw err;
                commentCollection.find({}).toArray(function(err, docs) {
                    if (err) throw err;
                });
            });

        res.json(ret);
    });

    // return all the comments for a specific topic
    app.get('/api/topics/:id', function(req, res) {
        commentCollection.find({"topic" : req.params.id}).toArray(function(err, docs) {
            if (err) throw err;
            res.json(docs);
        });
    });

    // make a new comment for a given topic
    app.post('/api/topics/:id', function(req, res) {
        let id = Date.now();
        let newComment = {
            id : id,
            topic : req.body.topic,
            text : req.body.text,
            parent : req.body.parent
        };

        commentCollection.insertOne(newComment, function(err, result) {
            if (err) throw err;
            res.json({id: id});
        });
    });

    app.use('*', express.static(APP_PATH));

    app.listen(app.get('port'), function() {
        console.log('Server started: http://localhost:' + app.get('port') + '/');
    });

})


