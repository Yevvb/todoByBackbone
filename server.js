var express = require('express');
// var mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/todobybackbone');

// var Schema = mongoose.Schema;

// var BlogsSchema = new Schema({
//     author: String,
//     title: String,
//     url: String
// });

// mongoose.model('Blog', BlogsSchema);

// var Blog = mongoose.model('Blog');

// var blog = new Blog({
//     author: 'john',
//     title: 'john\'s blog',
//     url: 'http://john.com'
// });

// blog.save();

var app = express();

app.use(express.static(__dirname + '/public'));

var port = 3333;

app.listen(port);

console.log('server on localhost:' + port);