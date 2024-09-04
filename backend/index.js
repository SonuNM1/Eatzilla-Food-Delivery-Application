const express = require("express") ; 
const app = express() ; 
require('dotenv').config() ; 
const connectDB = require("./db") ; 

const port = process.env.PORT || 5000 ; 

connectDB() ; 

app.use(express.json()) ; // Middleware to parse JSON bodies

app.use('/api', require('./routes/CreateUser'))

app.listen(port, ()=>{
    console.log(`Server listening on port: ${port}`);  
})