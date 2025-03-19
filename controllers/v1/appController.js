// const { User } = require("../../database"); 
const User = require('../../models/user-modal');
const fs = require("fs");
const path = require("path");
const mongoose = require('mongoose');

// exports.updateProfile = async (req, res) => {
//     try {
//         const { userId, name, email } = req.body; 
//         let profileImageUrl = null;

//         const user = await User.findByPk(userId);
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

     
//         if (req.file) {
//             profileImageUrl = `/uploads/${req.file.filename}`;

    
//             if (user.profileImageUrl) {
//                 const oldImagePath = path.join(__dirname, "../../", user.profileImageUrl);
//                 if (fs.existsSync(oldImagePath)) {
//                     fs.unlinkSync(oldImagePath);
//                 }
//             }
//         }

//         // Update user details
//         await user.update({
//             name: name || user.name,
//             email: email || user.email,
//             profileImageUrl: profileImageUrl || user.profileImageUrl,
//         });

//         return res.status(200).json({
//             message: "Profile updated successfully",
//             user: {
//                 id: user.id,
//                 name: user.name,
//                 email: user.email,
//                 profileImageUrl: user.profileImageUrl,
//             },
//         });
//     } catch (error) {
//         return res.status(500).json({ message: "Something went wrong", error: error.message });
//     }
// };

exports.updateProfile = async (req, res) => {
    try {
        const { userId, email, firstName, lastName } = req.body;
        const profileImage = req.file ? req.file.filename : null;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        console.log("Received userId:", userId); 

        // Convert userId to integer
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Delete old image if a new one is uploaded
        if (profileImage && user.profileImageUrl) {
            const oldImagePath = path.join(__dirname, "../uploads", user.profileImageUrl);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
        }

        // Update user details
        user.email = email || user.email;
        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        if (profileImage) user.profileImageUrl = profileImage;

        await user.save();

        return res.status(200).json({
            message: "Profile updated successfully",
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                profileImageUrl: user.profileImageUrl,
            },
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


// exports.updateProfile = async (req, res) => {
//     try {
//         const { userId, email, firstName, lastName } = req.body;
//         const profileImage = req.file ? req.file.filename : null;

//         // Check if userId is provided
//         if (!userId) {
//             return res.status(400).json({ message: "User ID is required" });
//         }

//         // Find user by ID
//         const user = await User.findByPk(String(userId)); 
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // Delete old image if a new one is uploaded
//         if (profileImage && user.profileImage) {
//             const oldImagePath = path.join(__dirname, "../uploads", user.profileImage);
//             if (fs.existsSync(oldImagePath)) {
//                 fs.unlinkSync(oldImagePath);
//             }
//         }

//         // Update user details
//         user.email = email || user.email;
//         user.firstName = firstName || user.firstName;
//         user.lastName = lastName || user.lastName;
//         if (profileImage) user.profileImage = profileImage;

//         await user.save();

//         return res.status(200).json({
//             message: "Profile updated successfully",
//             user: {
//                 id: user.id,
//                 email: user.email,
//                 firstName: user.firstName,
//                 lastName: user.lastName,
//                 profileImage: user.profileImage,
//             },
//         });
//     } catch (error) {
//         return res.status(500).json({ message: "Internal server error", error: error.message });
//     }
// };
