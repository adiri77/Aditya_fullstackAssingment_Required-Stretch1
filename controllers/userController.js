// controllers/userController.js
const User = require('../models/User');
const Student=require('../models/schema')

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const newUser = new User({ email, password });
    await newUser.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || password !== user.password) {
      return res.status(401).send('Authentication failed');
    }
    const student = await Student.findOne({ email: email });
    if (!student) {
      return res.status(404).send('No linked student profile found');
    }
    res.send({
      message: 'User authenticated successfully',
      userId: student._id 
      // Send this id to be used in the frontend
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
