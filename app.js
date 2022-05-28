const express = require('express');
require('express-async-errors');
const app = express();

const userRouter = require('./routers/userRouter');
const categoryRouter = require('./routers/categoryRouter');
const productRouter = require('./routers/productRouter');

const error = require('./middlewares/error');

require('./middlewares')(app);

app.use('/api/user', userRouter);
app.use('/api/category', categoryRouter);
app.use('/api/product', productRouter);


// The express-aync-error needs to placed after router i.e. userRouter middleware. since userRouter does'nt have any next func
app.use(error)

module.exports= app;