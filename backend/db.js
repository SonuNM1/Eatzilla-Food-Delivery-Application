const mongoose = require("mongoose");
const colors = require("colors");
const EventEmitter = require("events");

const dbEvents = new EventEmitter();

const connectDB = async () => {
    try {
       
        await mongoose.connect(process.env.mongoURI);

        console.log(`Database connected: ${mongoose.connection.host}`.bgGreen.white);

        // Fetch food_items collection

        const fetched_data = mongoose.connection.db.collection("food_items");
        
        const data = await fetched_data.find({}).toArray();

        console.log('Fetched food_items data:', data);

        global.food_items = data; // Store fetched data

        // Fetch foodCategory collection
    
        const foodCategory = mongoose.connection.db.collection("foodCategory");
    
        const catData = await foodCategory.find({}).toArray();
    
        console.log('Fetched foodCategory data:', catData);

        global.foodCategory = catData; // Store fetched data

    } catch (error) {
        console.log(`MongoDB Server Issue: ${error}`.bgRed.white);
    }
};

module.exports = { connectDB };
