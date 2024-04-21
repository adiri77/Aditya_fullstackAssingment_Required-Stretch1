// controllers/studentsController.js
const Student = require('../models/schema'); // Assuming the file is named Student.js

// Create a new profile
exports.createProfile = async (req, res) => {
  const student = new Student(req.body);
  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Middleware to get a student document by ID

exports.getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    console.error('Error retrieving student:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getStudent1 = async (req, res, next) => {
  try {
    console.log(`Fetching student with ID++++++++++++++++++++++++++: ${req.params.id}`);
    const student = await Student.findById(req.params.id);

    if (!student) {
      console.log(`No student found with ID: ${req.params.id}`);
      return res.status(404).json({ message: 'Student not found' });
    }
    console.log(res.student,"ghhcghcgcgg+++++++++++++");
    res.student = student;
    console.log(`Student found: ${student.name}`);  // Log the student's name to confirm it's correct
    next();
  } catch (error) {
    console.error(`Error retrieving student: ${error}`);
    res.status(500).json({ message: 'Internal server error' });

    console.log("++++++++++++++++++++++++++++");
  }
};



// Update a profile
// Update a profile
exports.updateProfile = async (req, res) => {
  console.log(`Attempting to update student: ${req.params.id}`);
  if (!res.student) {
    console.log('Student object not set in response; check middleware.');
    return res.status(404).json({ message: 'No student found with this ID' });
  }

  const allowedUpdates = ['name', 'email', 'bio', 'techStack', 'location', 'fieldOfInterest', 'seeking', 'hireable'];
  const updates = Object.keys(req.body);

  const isInvalidUpdate = updates.some(update => !allowedUpdates.includes(update));
  if (isInvalidUpdate) {
    return res.status(400).json({ message: 'Invalid updates!' });
  }

  updates.forEach(key => {
    res.student[key] = req.body[key];
  });

  try {
    const updatedStudent = await res.student.save();
    res.json(updatedStudent);
  } catch (err) {
    console.error('Failed to update student:', err);
    res.status(400).json({ message: err.message });
  }
};



// Function to handle user signup
exports.signup = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    const token = student.generateAuthToken(); // Make sure this function exists and correctly generates a JWT

    // Send both the token and the user ID in the response.
    // Ensure you are only sending back necessary and safe user information.
    res.status(201).send({ 
      token: token,
      userId: student._id, // Explicitly sending the userId
      name: student.name, // Optionally send other safe details
      email: student.email
    });
  } catch (error) {
    console.error('Signup error:', error);
    if (error.name === 'ValidationError') {
      // Send more detailed error messages if validation fails
      return res.status(400).send({ message: error.message, fields: error.errors });
    }
    // Send a generic 400 error if other errors occur
    res.status(400).send({ message: 'Bad Request' });
  }
};








// Delete a profile
// Function to delete a profile
// Middleware to load student into res.student
exports.getStudent2 = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.student = student; // Correctly set the student for subsequent middleware
    next();
  } catch (error) {
    console.error(`Error retrieving student: ${error}`);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Use deleteOne method to delete the student
exports.deleteProfile = async (req, res) => {
  if (!res.student) {
    return res.status(404).json({ message: 'No student found with this ID' });
  }
  try {
    await Student.deleteOne({ _id: res.student._id });
    res.json({ message: 'Deleted Student' });
  } catch (err) {
    console.error('Failed to delete student:', err);
    res.status(400).json({ message: err.message });
  }
};



// Get all profiles with optional search functionality
// In your profile searching and fetching controller
exports.getAllProfiles = async (req, res) => {
    try {
      const sortKey = req.query.sort === 'techStack' ? 'techStack' : 'name';
      const profiles = await Student.find({}).sort(sortKey);
      res.json(profiles);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  exports.searchProfiles = async (req, res) => {
    try {
      const regex = new RegExp(req.query.search, 'i');
      const sortKey = req.query.sort === 'techStack' ? 'techStack' : 'name';
      const profiles = await Student.find({
        $or: [
          { name: { $regex: regex } },
          { bio: { $regex: regex } },
          { techStack: { $regex: regex } }
        ]
      }).sort(sortKey);
      res.json(profiles);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
