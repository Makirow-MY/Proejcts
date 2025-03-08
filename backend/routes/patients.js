const express = require('express');
const multer = require('multer');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const Patients = require('../models/patients')

/*
// Get all users
router.get('/', asyncHandler(async (req, res) => {
    try {
        const users = await User.find();
        res.json({ success: true, message: "Users retrieved successfully.", data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}));

// login
router.post('/login', async (req, res) => {
    const { name, password } = req.body;
   // console.log("{ name, password }", { name, password });
    if (!name || !password) {
        
            return res.status(401).json({ success: false, message: "Please provide all information" });
       
    }

    try {
        // Check if the user exists
        const user = await User.findOne({ $or: [{ email: name }, { name: name }] });


        if (!user) {
            return res.status(401).json({ success: false, message: "User doesn't yet exit" });
        }
        // Check if the password is correct
        if (user.password !== password) {
            return res.status(401).json({ success: false, message: "Password is incorrect" });
        }

        // Authentication successful
        if (user &&  (user.password === password)) {
          return   res.status(200).json({ success: true, message: "Login successful.", data: user });
        }
       
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});


// Get a user by ID
router.get('/:id', asyncHandler(async (req, res) => {
    try {
        const userID = req.params.id;
        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }
        res.json({ success: true, message: "User retrieved successfully.", data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}));
// Update a user
router.put('/:id', asyncHandler(async (req, res) => {
    try {
        const userID = req.params.id;
        const { name, password } = req.body;
        if (!name || !password) {
            return res.status(400).json({ success: false, message: "Name,  and password are required." });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userID,
            { name, password },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        res.json({ success: true, message: "User updated successfully.", data: updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}));

// Delete a user
router.delete('/:id', asyncHandler(async (req, res) => {
    try {
        const userID = req.params.id;
        const deletedUser = await User.findByIdAndDelete(userID);
        if (!deletedUser) {
            return res.status(404).json({ success: false, message: "User not found." });
        }
        res.json({ success: true, message: "User deleted successfully." });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}));

*/
// Create a new user
router.post('/register', asyncHandler(async (req, res) => {
console.log("Req9898", req);
    try{

       
        }
        catch(err){
            console.log(`Error creating category: ${err.message}`);
            return res.status(500).json({ success: false, message: err.message });   
        }
   
}));



module.exports = router;
