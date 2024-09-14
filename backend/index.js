const express = require("express");
const app = express();
require('dotenv').config();
const { connectDB } = require("./db"); 
const cors = require('cors') ; 

const port = process.env.PORT || 5000;

connectDB();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))

/*
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
    next();
});
*/

app.use(express.json()); // Middleware to parse JSON bodies

app.use('/api', require('./routes/CreateUser'));
app.use('/api', require('./routes/DisplayData'));

// Start the server immediately
app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});
