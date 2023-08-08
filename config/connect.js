const mongoose = require('mongoose');
const connectDB = async() => {
    await mongoose.connect('mongodb+srv://hsuntariq:hello123@cluster0.r1f4mod.mongodb.net/?retryWrites=true&w=majority');
    console.log(`database connected on host:${mongoose.connection.host}`);
}

module.exports = connectDB
