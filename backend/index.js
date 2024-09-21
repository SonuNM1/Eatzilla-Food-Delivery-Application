const express = require("express");
const app = express();
require('dotenv').config();
const { connectDB } = require("./db"); 
const cors = require('cors') ; 

const port = process.env.PORT || 5000;

connectDB();

const allowedOrigins = ['https://eatzilla.netlify.app']; 

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));


app.use(express.json()); // Middleware to parse JSON bodies

app.use('/', require('./routes/CreateUser'));
app.use('/', require('./routes/DisplayData'));
app.use('/', require('./routes/OrderData'));

// Start the server immediately
app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});
