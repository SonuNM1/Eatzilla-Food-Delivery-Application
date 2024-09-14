const express = require("express");
const router = express.Router();

router.post('/foodData', (req, res) => {
    try {
        console.log('Food Items:', global.food_items);  // Debug log
        console.log('Food Category:', global.foodCategory);  // Debug log

        if (global.food_items && global.foodCategory) {
            res.send([global.food_items, global.foodCategory]);
        } else {
            res.send("Data not loaded from the database yet, please try again later.");
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;
