//server/server.js
import express from 'express';
import mongoose from 'mongoose';
import router from'./routes/routes.js';
import path from 'path';
import bodyParser from 'body-parser';
import logger from 'morgan';
import Book from './models/Book';
var app = express();

const API_PORT = process.env.API_PORT || 3001;

// app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client/src'));
app.use(express.static(path.join(__dirname, '../client/public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));


mongoose.connect('mongodb://localhost/mern-app');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we are connected!')
});
app.use('/api', router);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
module.exports=app;