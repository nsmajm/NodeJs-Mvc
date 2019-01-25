
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const config = require('./config');
const userRoutes = require('./Routes/UserRoutes');

const app = express();

mongoose.Promise = global.Promise;

mongoose.connect(config.dbUrl, {
    useCreateIndex: true,
    useNewUrlParser: true
}, (err, res) => {
    if (err) {
        console.log('errors', '')
    }
    else {
        console.log('connected To The Mongo Database')
    }
})

app.use(logger('dev'));

app.use(bodyParser.json());

app.use('/api/user', userRoutes)

app.listen(3000, () => {
    console.log(`Server started on port`);
});
