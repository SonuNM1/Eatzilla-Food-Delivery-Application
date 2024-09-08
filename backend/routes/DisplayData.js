const express = require("express") ; 
const router = express.Router() ; 

/*
router.post('/foodData', (req, res)=>{
    try{
        console.log(global.food_items) ; 
        res.send([global.food_items, global.foodCategory]) ; 
    }catch(error){
        console.log(error.message) ; 
        res.send("Server error")
    }
})
    */

router.post('/foodData', (req, res) => {
    try {
        // Check if data is loaded
        if (!global.dataLoaded) {
            return res.status(503).send("Data not loaded from the database yet, please try again later");
        }

        // Send the data if it's loaded
        res.send([global.food_items, global.foodCategory]);

    } catch (error) {
        console.log(error.message);
        res.send("Server error");
    }
});

module.exports = router ; 