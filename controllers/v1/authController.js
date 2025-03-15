const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../models/user-modal');
const secret_Key = 'My_secret_Key';
const bcrypt = require('bcrypt');

exports.signup = async (req, res) => {
    try {
        const { phoneNumber, firstName, lastName, email, password, birthday } = req.body;

        if (!phoneNumber || !password) {
            return res.status(400).json({ message: "Phone number and password are required." });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ phoneNumber });
        if (existingUser) {
            return res.status(400).json({ message: "Phone number already exists." });
        }

        // Check if a file was uploaded
        let profileImageUrl = "";
        if (req.file) {
            profileImageUrl = `/uploads/${req.file.filename}`;
        }

        // Create a new user
        const newUser = new User({
            phoneNumber,
            firstName,
            lastName,
            email,
            password, 
            birthday,
            profileImageUrl,
        });


        await newUser.save();

        const token = jwt.sign({ id: newUser._id, phoneNumber: newUser.phoneNumber }, secret_Key, { expiresIn: "7d" });

        return res.status(200).json({ message: "User registered successfully.", user: newUser, token });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong.", error: error.message });
    }
};

// exports.signup = async (req, res) => {
//     try {
//         const { phoneNumber, firstName, lastName, email, password, birthday } = req.body;

//         if (!phoneNumber || !password) {
//             return res.status(400).json({ message: "Phone number and password are required." });
//         }

//         // Check if user already exists
//         const existingUser = await User.findOne({ phoneNumber });
//         if (existingUser) {
//             return res.status(400).json({ message: "Phone number already exists." });
//         }

//         // Hash the password before saving
//         const hashedPassword = await bcrypt.hash(password, 10); 

//         // Check if a file was uploaded
//         let profileImageUrl = "";
//         if (req.file) {
//             profileImageUrl = `/uploads/${req.file.filename}`;
//         }

//         // Create a new user
//         const newUser = new User({
//             phoneNumber,
//             firstName,
//             lastName,
//             email,
//             password: hashedPassword, 
//             birthday,
//             profileImageUrl,
//         });

//         await newUser.save();

//         const token = jwt.sign({ id: newUser._id, phoneNumber: newUser.phoneNumber }, secret_Key, { expiresIn: "7d" });

//         return res.status(200).json({ message: "User registered successfully.", user: newUser, token });
//     } catch (error) {
//         return res.status(500).json({ message: "Something went wrong.", error: error.message });
//     }
// };

// exports.login = async (req, res) => {
//     try {
//         const { phoneNumber, password } = req.body;

//         if (!phoneNumber || !password) {
//             return res.status(400).json({ message: "Phone number and password are required." });
//         }

//         const user = await User.findOne({ phoneNumber });

//         if (!user) {
//             return res.status(401).json({ message: "Invalid phone number or password." });
//         }

//         // Compare hashed password
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(401).json({ message: "Invalid phone number or password." });
//         }

//         const token = jwt.sign({ id: user._id, phoneNumber: user.phoneNumber }, secret_Key, { expiresIn: '7d' });

//         return res.status(200).json({ message: "Login successful.", user, token });
//     } catch (error) {
//         return res.status(500).json({ message: "Something went wrong.", error: error.message });
//     }
// };

exports.login = async (req, res) => {
    try {
        const { phoneNumber, password } = req.body;

        if (!phoneNumber || !password) {
            return res.status(400).json({ message: "Phone number and password are required." });
        }

        const user = await User.findOne({ phoneNumber });


        if (!user || user.password !== password) { 
            return res.status(401).json({ message: "Invalid phone number or password." });
        }

        const token = jwt.sign({ id: user._id, phoneNumber: user.phoneNumber }, secret_Key, { expiresIn: '7d' });

        return res.status(200).json({ message: "Login successful.", user, token });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong.", error: error.message });
    }
};

//Update Password=============================
exports.updatePassword = async (req, res) => {
    try {
        const { id, oldPassword, newPassword } = req.body;

        if (!id || !oldPassword || !newPassword) {
            return res.status(400).json({ message: "ID, old password, and new password are required." });
        }

        // Find user by ID
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Check if old password is correct
        if (user.password !== oldPassword) {
            return res.status(401).json({ message: "Old password is incorrect." });
        }

        // Update password
        user.password = newPassword;
        await user.save();

        return res.status(200).json({ message: "Password updated successfully." });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong.", error: error.message });
    }
};

// exports.updatePassword = async (req, res) => {
//     try {
//         const { id, oldPassword, newPassword } = req.body;

//         if (!id || !oldPassword || !newPassword) {
//             return res.status(400).json({ message: "ID, old password, and new password are required." });
//         }

//         // Find user by ID
//         const user = await User.findById(id);
//         if (!user) {
//             return res.status(404).json({ message: "User not found." });
//         }

//         // Check if old password is correct
//         const isMatch = await bcrypt.compare(oldPassword, user.password);
//         if (!isMatch) {
//             return res.status(401).json({ message: "Old password is incorrect." });
//         }

//         // Hash new password before saving
//         const hashedNewPassword = await bcrypt.hash(newPassword, 10);

//         // Update password
//         user.password = hashedNewPassword;
//         await user.save();

//         return res.status(200).json({ message: "Password updated successfully." });
//     } catch (error) {
//         return res.status(500).json({ message: "Something went wrong.", error: error.message });
//     }
// };




