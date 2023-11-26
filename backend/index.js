const express = require("express");
const app = express();
const cors = require('cors')
require('dotenv').config();

const connectToMongo = require('./db');
connectToMongo();

const port = process.env.PORT;

app.use(cors())
app.use(express.json())


// Available Routes
app.use('/api/auth',require('./routes/User.js'));
app.use('/api/friends',require('./routes/Friends.js'));
app.use('/api/money',require('./routes/Transactions.js'));

app.listen(port || 3000 ,()=>{
    console.log(`Listening on the Port ${port}`)
})