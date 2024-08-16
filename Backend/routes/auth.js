const express = require("express")
const router = express.Router()
const User = require("../models/User")
const { body, validationResult } = require('express-validator')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetechuser')
const jwt_secret = "xhamster"

router.post("/createUser", [
    body('password', 'password must be minimum of 6 characters').isLength({ min: 6 }),
    body('name', 'enter a valid name').isLength({ min: 3 }),
    body('email', 'enter a valid email').isEmail()
], async (req, res) => {
    const errors = validationResult(req);

    //if there are any errors in the request it will return errors 
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    //checking whether the user with this email exists already or not
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: "User with this Email already exists!" })
        }
        //hashing password by appending salt
        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password, salt)
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
            date: req.body.date,
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, jwt_secret)
        res.json({ authtoken })
        console.log(authtoken)
    } catch (error) {
        console.error(error.message)
        return res.status(500).send("Something went wrong!")
    }
})

router.post("/login", [
    body('password', 'password cannot be blank').exists(),
    body('email', 'enter a valid email').isEmail()
], async (req, res) => {
    const errors = validationResult(req);

    //if there are any errors in the request it will return errors 
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, jwt_secret)
        res.json({ authtoken })
    } catch (error) {
        console.error(error.message)
        return res.status(500).send("Something went wrong!")
    }
})


//Route 3 : get logged in uuser details 
router.post("/getuser",fetchuser,  async (req, res) => {
    try {
        userId = req.user.id
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message)
        return res.status(500).send("Something went wrong!")
    }
})
module.exports = router