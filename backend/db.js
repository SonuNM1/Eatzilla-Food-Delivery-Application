const mongoose = require("mongoose") ; 
const colors = require("colors") ; // used to color the console outputs 

// Function to connect the MongoDB Database 

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.mongoURI);
        console.log(`Database connected: ${mongoose.connection.host}`.bgGreen.white);

        // Fetch food_items collection
        const fetched_data = await mongoose.connection.db.collection("food_items");

        fetched_data.find({}).toArray(async function (err, data) {
            if (err) {
                console.log('Error fetching food_items:', err);
            } else {
                console.log('Fetched food_items data:', data);
                global.food_items = data;

                // Fetch foodCategory collection
                const foodCategory = await mongoose.connection.db.collection("foodCategory");

                foodCategory.find({}).toArray(function (err, catData) {
                    if (err) {
                        console.log('Error fetching foodCategory:', err);
                    } else {
                        console.log('Fetched foodCategory data:', catData);
                        global.foodCategory = catData;

                        // Set the flag to true once data is fully loaded
                        global.dataLoaded = true;
                    }
                });
            }
        });

    } catch (error) {
        console.log(`MongoDB Server Issue: ${error}`.bgRed.white);
    }
};

module.exports = connectDB;







