const express = require("express");
const router = express.Router();

router.post('/foodData', (req, res) => {
    try {
        console.log('Food Items:', global.food_items);  // Debug log
        console.log('Food Category:', global.foodCategory);  // Debug log

        if (global.food_items && global.foodCategory) {
            // Remove any duplicates from food_items and foodCategory if needed
            const uniqueFoodItems = [...new Map(global.food_items.map(item => [item._id, item])).values()];
            const uniqueFoodCategories = [...new Map(global.foodCategory.map(cat => [cat._id, cat])).values()];

            res.send([uniqueFoodItems, uniqueFoodCategories]);
        } else {
            res.status(404).send("Data not loaded from the database yet, please try again later.");
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error");
    }
});


module.exports = router;
