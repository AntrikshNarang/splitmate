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
// app.use('/api/items',require('./routes/Items.js'));

app.listen(port,()=>{
    console.log(`Listening on the Port ${port}`)
})