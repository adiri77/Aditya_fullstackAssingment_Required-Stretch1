const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  techStack: {
    type: [String],
    required: true,
  },
  location: {
    type: String,
  },
  fieldOfInterest: {
    type: [String],
  },
  seeking: {
    type: [String],
  },
  bio: {
    type: String,
  },
  githubURL: {
    type: String,
  },
  twitterURL: {
    type: String,
  },
  website_URL: {
    type: String,
  },
  linkedinURL: {
    type: String,
  },
   email:{
    type:String,
  },
}, { timestamps: true });

// Method to generate authentication token
studentSchema.methods.generateAuthToken = function() {
  // Generate a token
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
  return token;
};


studentSchema.index({ name: 'text', bio: 'text', 'techStack': 'text' });

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
