const express = require('express');
const app = express();
const http = require('http');
require('dotenv').config();
require('colors');
const server = http.createServer(app);
const cors = require('cors');
const connectDB = require('./config/connect');
const {
    errorHandler
} = require('./middlewares/errorMiddleware');
// allow cross site requests
app.use(cors());
// connect to the database

connectDB()
// get the data from the body
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

app.use('/api/', require('./routes/sectorRoutes'));

// check for errors
app.use(errorHandler)
server.listen(3001,()=>console.log(`server started on port:3001`))