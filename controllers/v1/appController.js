const { User } = require("../../database"); 
const fs = require("fs");
const path = require("path");
const mongoose = require('mongoose');

exports.updateProfile = async (req, res) => {
    try {
        const { userId, name, email } = req.body; 
        let profileImageUrl = null;

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

     
        if (req.file) {
            profileImageUrl = `/uploads/${req.file.filename}`;

    
            if (user.profileImageUrl) {
                const oldImagePath = path.join(__dirname, "../../", user.profileImageUrl);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
        }

        // Update user details
        await user.update({
            name: name || user.name,
            email: email || user.email,
            profileImageUrl: profileImageUrl || user.profileImageUrl,
        });

        return res.status(200).json({
            message: "Profile updated successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                profileImageUrl: user.profileImageUrl,
            },
        });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};



