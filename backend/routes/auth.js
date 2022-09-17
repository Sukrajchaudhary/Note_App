const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchUser=require('../middleware/fetchUser');
const JWT_SECRETE = "Sukrajchaudhary@123";
// Route:1 Creating a user using: Post "/api/auth".
router.post('/createuser', [
    body('name', 'Enter a Valid Name:').isLength({ min: 4 }),
    body('email', 'Please Enter a valid Email').isEmail(),
    body('password', 'Password must be 5 character').isLength({ min: 5 }),

], async (req, res) => {
    let success=false;
    //if there are errors,return Bad request and the err
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
        success,    errors: errors.array()
        });
    }
    //Check whether email exista already 
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({success, error: "Sorry a user With This Email already exist" })
        }
        const salt = await bcrypt.genSalt(10);
        secPass = await bcrypt.hash(req.body.password, salt);
        // Create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRETE);
        //  res.json(user)
        success=true;
        res.json({success, authtoken })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some Error Occured");
    }
})

// Route:2 Authenticate a user Using:Post "/api/auth/login".No login required
router.post('/login', [
    //body('name', 'Enter a Valid Name:').isLength({ min: 4 }),
    body('email', 'Please Enter a valid Email').isEmail(),
    body('password', 'Password can not be blank').exists(),
], async (req, res) => {
    let success=false;

    //IF there are errors, return Bad request and the errorrs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const { email, password } = req.body;
    try {

        let user = await User.findOne({ email });
        if (!user) {
            success=false;
            return res.status(400).json({ success,error: "Please try to login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success=false;
            return res.status(400).json({ success,error: "Please try to login with correct credentials" });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRETE);
        success=true;
        res.json({ success,authtoken });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error Occured");
    }


});
// Route 3: Get loggin user Details using:Post "/api/auth/getuser".Login required
router.post('/getuser',fetchUser, async (req, res) => {

    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error Occured");
    }
})
module.exports = router