const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../models/user-modal'); // Ensure this path points to your User model
const secret_Key = 'My_secret_Key';
exports.signup = async (req, res) => {
    try {
        const { phoneNumber, firstName, lastName, email, password, birthday, profileImageUrl } = req.body;

        if (!phoneNumber || !password) {
            return res.status(400).json({ message: "Phone number and password are required." });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ phoneNumber });
        if (existingUser) {
            return res.status(400).json({ message: "Phone number already exists." });
        }

        // Create a new user
        const newUser = new User({
            phoneNumber,
            firstName,
            lastName,
            email,
            password, // Ensure you hash the password before saving in a real application
            birthday,
            profileImageUrl
        });

        // Save the user to the database
        await newUser.save();

        // Generate a JWT token
        const token = jwt.sign({ id: newUser._id, phoneNumber: newUser.phoneNumber }, secret_Key, { expiresIn: '7d' });

        return res.status(200).json({ message: "User registered successfully.", user: newUser, token });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong.", error: error.message });
    }
};
exports.login = async (req, res) => {
    try {
        const { phoneNumber, password } = req.body;

        if (!phoneNumber || !password) {
            return res.status(400).json({ message: "Phone number and password are required." });
        }

        // Find the user by phone number
        const user = await User.findOne({ phoneNumber });

        // Check if user exists and if the password matches
        if (!user || user.password !== password) { // In a real application, use a password comparison function
            return res.status(401).json({ message: "Invalid phone number or password." });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id, phoneNumber: user.phoneNumber }, secret_Key, { expiresIn: '7d' });

        return res.status(200).json({ message: "Login successful.", user, token });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong.", error: error.message });
    }
};





// const jwt = require('jsonwebtoken');
// const db = require('../../database'); 
// const User = db.User; 
// const secret_Key = 'My_secret_Key';

// exports.signup = async (req, res) => {
//   try {
//       const { phoneNumber, firstName, lastName, email, password, birthday, profileImageUrl } = req.body;

//       if (!phoneNumber || !password) {
//           return res.status(400).json({ message: "Phone number and password are required." });
//       }

//       const existingUser = await User.findOne({ where: { phoneNumber } });
//       if (existingUser) {
//           return res.status(400).json({ message: "Phone number already exists." });
//       }

//       const newUser = await User.create({
//           phoneNumber,
//           firstName,
//           lastName,
//           email,
//           password, 
//           birthday,
//           profileImageUrl
//       });

//       const token = jwt.sign({ id: newUser.id, phoneNumber: newUser.phoneNumber }, secret_Key, { expiresIn: '7d' });

//       return res.status(200).json({ message: "User registered successfully.", user: newUser, token });
//   } catch (error) {
//       return res.status(500).json({ message: "Something went wrong.", error: error.message });
//   }
// };

// exports.login = async (req, res) => {
//   try {
//       const { phoneNumber, password } = req.body;

//       if (!phoneNumber || !password) {
//           return res.status(400).json({ message: "Phone number and password are required." });
//       }

//       const user = await User.findOne({ where: { phoneNumber } });

//       if (!user || user.password !== password) {
//           return res.status(401).json({ message: "Invalid phone number or password." });
//       }

//       const token = jwt.sign({ id: user.id, phoneNumber: user.phoneNumber }, secret_Key, { expiresIn: '7d' });

//       return res.status(200).json({ message: "Login successful.", user, token });
//   } catch (error) {
//       return res.status(500).json({ message: "Something went wrong.", error: error.message });
//   }
// };




