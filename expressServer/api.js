//This file configure and starts the server that is (Begins listening for incoming requests on the specified hostname and port)

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRouter = require('./api/apiRouter');

const hostname = '127.0.0.1';
const port = 5000;

//configure bodyParser
const jsonParser = bodyParser.json();
const urlEncoderParser = bodyParser.urlencoded({extended: false});

app.use(jsonParser);
app.use(urlEncoderParser); 

//configure cors
app.use(cors());

//configure Router
app.use('/api', apiRouter);

app.listen(port, hostname, () => {
    console.log(`Express Server is started at http://${hostname}:${port}`);
});

app.get('/', (request, response) => {
    response.send(`<h1>Welcome to From Express js</h1>`);
})
