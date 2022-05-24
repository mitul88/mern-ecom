require('express-async-errors');
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

const userRouter = require('./routers/userRouter');
const categoryRouter = require('./routers/categoryRouter');
const error = require('./middlewares/error');

app.use(express.json());
app.use(cors());

if(process.env.NODE_ENV==='development') {
    app.use(morgan('dev'));
}

app.use('/api/user', userRouter);
app.use('/api/category', categoryRouter);


// The express-aync-error needs to placed after router i.e. userRouter middleware. since userRouter does'nt have any next func
app.use(error)

module.exports= app;