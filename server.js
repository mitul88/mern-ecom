const mongoose = require('mongoose');
const app = require('./app');

const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGODB_URL_LOCAL)
    .then(()=> console.log("Mongodb connected"))
    .catch(err=> console.error("Mongo connection error, check your mongo connectivity", err))

const port = process.env.PORT || 3001;

app.listen(port, ()=> {
    console.log(`App running on ${port}` )
})