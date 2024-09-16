const express = require("express") ; 
const router = express.Router() ; 
const User = require("../models/User");
const {body, validationResult} = require("express-validator") ;
const bcrypt = require("bcryptjs") ;
const jwt = require("jsonwebtoken") ; 

const jwtSecret = "hafjdjod945-2394-hijfi" ; 

// sign up logic - handle validations 

router.post('/createuser', [
    body("email").isEmail(),
    body("name").isLength({min:3}),
    body("password", "Incorrect Password").isLength({min:5})
], 
    async(req, res)=>{

        const errors = validationResult(req) ; 
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array()
            })
        }

        const salt = await bcrypt.genSalt(10) ; 

        let securePassword = await bcrypt.hash(req.body.password, salt)

    try{
        await User.create({
            name: req.body.name,
            password: securePassword,
            email: req.body.email,
            location: req.body.location
        }).then(res.json({
            success: true
        }))

    }catch(error){
        console.log(`Error: ${error}`.bgRed.white) ; 
        res.json({
            success: false
        })
    }
})


// log in

router.post('/loginuser', [
    body('email').isEmail(),
    body('password', 'Incorrect password').isLength({ min: 5 })
  ], async (req, res) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
  
    let email = req.body.email;
  
    try {
      // Find user by email
      let userData = await User.findOne({ email });
      if (!userData) {
        return res.status(400).json({ error: "Try logging in with correct credentials" });
      }
  
      // Compare password
      const passwordCompare = await bcrypt.compare(req.body.password, userData.password);
      if (!passwordCompare) {
        return res.status(400).json({ error: "Try logging in with correct credentials" });
      }
  
      // JWT payload
      const data = {
        user: {
          id: userData.id
        }
      };
  
      // Generate token
      const authToken = jwt.sign(data, jwtSecret);
      console.log("AuthToken Generated:", authToken);
  
      // Success response
      return res.json({
        success: true,
        authToken: authToken
      });
  
    } catch (error) {
      console.log(`Error: ${error}`.bgRed.white);
      res.status(500).json({
        success: false,
        message: "Internal Server Error"
      });
    }
  });
  

module.exports = router ; 