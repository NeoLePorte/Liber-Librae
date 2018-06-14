//server.js
import express from 'express';
import mongoose from 'mongoose';
import router from'./routes/routes.js';
import path from 'path';
import bodyParser from 'body-parser';
import logger from 'morgan';
import Book from './models/Book';
import { AuthorizationV1, SpeechToTextV1 } from 'watson-developer-cloud';
import vcapServices from 'vcap_services';
import cors from 'cors';
import Config from './Config.js';
import RateLimit from 'express-rate-limit';
const app = express();

const API_PORT = process.env.API_PORT || 3001;

app.use(express.static(path.join(__dirname, '../client/public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

app.use(cors())

// token endpoints
// **Warning**: these endpoints should probably be guarded with additional authentication & authorization for production use

// speech to text token endpoint
var sttAuthService = new AuthorizationV1(
  Object.assign(
    {
      username: Config.USER_NAME, // or hard-code credentials here
      password: Config.PASSWORD
    },
    vcapServices.getCredentials('speech_to_text') // pulls credentials from environment in bluemix, otherwise returns {}
  )
);


app.use('/api/speech-to-text/token', function(req, res) {
  sttAuthService.getToken(
    {
      url: SpeechToTextV1.URL
    },
    function(err, token) {
      if (err) {
        console.log('Error retrieving token: ', err);
        res.status(500).send('Error retrieving token');
        return;
      }
      res.send(token);
    }
  );
});



// Chrome requires https to access the user's microphone unless it's a localhost url so
// this sets up a basic server on port 3001 using an included self-signed certificate
// note: this is not suitable for production use
// however bluemix automatically adds https support at https://<myapp>.mybluemix.net

  const fs = require('fs');
  const https = require('https');
  const HTTPS_PORT = 3002;

  const options = {
    key: fs.readFileSync(__dirname + '/keys/localhost.pem'),
    cert: fs.readFileSync(__dirname + '/keys/localhost.cert')
  };
  https.createServer(options, app).listen(HTTPS_PORT, function() {
    console.log('Secure server live at https://localhost:%s/', HTTPS_PORT);
  });



mongoose.connect('mongodb://localhost/mern-app');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we are connected!')
});
app.use('/api', router);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
module.exports=app;