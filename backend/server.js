//server.js
import config from './config'
import express from 'express';
import mongoose from 'mongoose';
import router from'./routes/routes.js';
import path from 'path';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';
const app = express();
const API_PORT = process.env.API_PORT || 3001;

app.use(express.static(path.join(__dirname, '../client/public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

app.use(cors())

mongoose.connect(`mongodb://${config.db.username}:${config.db.password}@${config.db.host}/liber-librae`);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we are connected!')
});
app.use('/api', router);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
module.exports=app;