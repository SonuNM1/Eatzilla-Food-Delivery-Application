const express = require("express");
const app = express();
require('dotenv').config();
const { connectDB } = require("./db"); 
const cors = require('cors') ; 

const port = process.env.PORT || 5000;

connectDB();

app.use(cors({
    origin: ['http://localhost:3000', 'https://eatzilla.netlify.app/'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}))


app.use(express.json()); // Middleware to parse JSON bodies

app.use('/', require('./routes/CreateUser'));
app.use('/', require('./routes/DisplayData'));
app.use('/', require('./routes/OrderData'));

// Start the server immediately
app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});
