const mongoose = require("mongoose") ; 
const colors = require("colors") ; 

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.mongoURI) ; 

        console.log(`Database connected: ${mongoose.connection.host}`.bgGreen.white);

        const fetched_data = await mongoose.connection.db.collection("food_items") ; // fetch the collection 

        // Find and print all documents in the collection 

        fetched_data.find({}).toArray( function(err, data){
            if(err){
                console.log(`Error fetching data: ${err}`.bgRed.white) ; 
            }
            else{
                console.log(data) ; 
            }
        })
        
    }catch(error){
        console.log(`MongoDB Server Issue: ${error}`.bgRed.white)
    }
}

module.exports = connectDB ; 




