const mongoose = require('mongoose');
const connectDB = async () => {
    try {   
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`database connected on host:${mongoose.connection.host.cyan}`);
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB
