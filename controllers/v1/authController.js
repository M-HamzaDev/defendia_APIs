const jwt = require('jsonwebtoken');
const db = require('../../database'); 
const User = db.User; 
const secret_Key = 'My_secret_Key';

exports.signup = async (req, res) => {
  try {
      const { phoneNumber, firstName, lastName, email, password, birthday, profileImageUrl } = req.body;

      if (!phoneNumber || !password) {
          return res.status(400).json({ message: "Phone number and password are required." });
      }

      const existingUser = await User.findOne({ where: { phoneNumber } });
      if (existingUser) {
          return res.status(400).json({ message: "Phone number already exists." });
      }

      const newUser = await User.create({
          phoneNumber,
          firstName,
          lastName,
          email,
          password, 
          birthday,
          profileImageUrl
      });

      const token = jwt.sign({ id: newUser.id, phoneNumber: newUser.phoneNumber }, secret_Key, { expiresIn: '7d' });

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

      const user = await User.findOne({ where: { phoneNumber } });

      if (!user || user.password !== password) {
          return res.status(401).json({ message: "Invalid phone number or password." });
      }

      const token = jwt.sign({ id: user.id, phoneNumber: user.phoneNumber }, secret_Key, { expiresIn: '7d' });

      return res.status(200).json({ message: "Login successful.", user, token });
  } catch (error) {
      return res.status(500).json({ message: "Something went wrong.", error: error.message });
  }
};




