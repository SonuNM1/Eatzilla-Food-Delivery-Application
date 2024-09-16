const express = require("express");
const router = express.Router();
const Order = require('../models/Orders');

router.post('/orderData', async (req, res) => {
    console.log("Request Body: ", req.body);  // Debugging log

    let data = req.body.order_data;

    // Insert the order date at the start of the order data array
    data.splice(0, 0, { Order_date: req.body.order_date });

    try {
        // Check if the email is present
        if (!req.body.email) {
            return res.status(400).json({ error: "Email is required" });
        }

        // Check if the email already exists in the database
        let eId = await Order.findOne({ 'email': req.body.email });

        if (eId === null) {
            // If email doesn't exist, create a new order
            await Order.create({
                email: req.body.email,
                order_data: [data]
            });
            return res.status(200).json({ success: true });
        } else {
            // If email exists, update the existing order by pushing the new data
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            );
            return res.status(200).json({ success: true });
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).send('Server Error: ' + error.message);
    }
});


router.post('/myOrderData', async (req, res) => {
    const email = req.body.email;
    
    try {
      const orders = await Order.find({ email: email });
      console.log(orders);  // Log this to check the data
      res.json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching orders' });
    }
  });
  


module.exports = router ; 