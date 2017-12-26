'use strict'
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Comment = require('./model/comments');

var app = express();
var router = express.Router();
var port = process.env.API_PORT || 3001;

//db config
var mongoDB = process.env.DATABASE_URI || 'mongodb://localhost:27017/cbox_dev'; 
mongoose.connect(mongoDB, {useMongoClient: true})
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//allow CORS with middleware
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Credentials', 'true');
	res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
	res.setHeader('Cache-Control', 'no-cache'); // remove cacheing
	next();
});

router.get('/', function(req, res){
	res.json({message: 'API initialized!'});
});
router.route('/comments')
	.get(function(req, res) {
		Comment.find(function(err,comments){
			if (err)
				res.send(err);
			res.json(comments);
	  });  
	})
	.post(function(req, res){
		var comment = new Comment();
		comment.author = req.body.author;
		comment.text = req.body.text;
		comment.save(function(err){
			if(err)
				res.send(err);
			res.json({message: 'Comment successfully added!'});
		});
	})

app.use('/api', router);

app.listen(port, function(){
	console.log(`API running on port ${port}`);
});