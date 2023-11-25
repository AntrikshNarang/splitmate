const mongoose = require('mongoose');
const url = process.env.MONGO_URL;

const connectToMongo = async () => {
    await mongoose.connect(url);
    console.log('Connected to MongoDB');
}

module.exports = connectToMongo;