const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');

mongoose.connect(config.mongoUrl, { useMongoClient: true }, (err) => {
    if (err) {
        console.log('error connecting to mongodb', err);
    } else {
        console.log('connected to mongodb');
    }
});
mongoose.Promise = global.Promise;

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const routes = require('./routes');
app.use('/api', routes);

app.listen(config.port, ()=> {
    console.log('server has started on port', config.port);
    console.log('environment', config);
});