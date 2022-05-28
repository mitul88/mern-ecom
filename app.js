const express = require('express');
require('express-async-errors');
const app = express();
const error = require('./middlewares/error');

require('./middlewares')(app);
require('./middlewares/routes')(app);

// The express-aync-error needs to placed after router i.e. userRouter middleware. since userRouter does'nt have any next func
app.use(error)


module.exports= app;