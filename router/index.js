// routes/students.js
const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/index');
const userController = require('../controllers/userController');

// Route for getting all profiles without search
router.get('/profiles', studentsController.getAllProfiles);
router.post('/register', userController.register);
router.post('/login', userController.login);
// Route for searching profiles
router.get('/profiles/search', studentsController.searchProfiles);
router.get('/profiles/:id', studentsController.getStudent);
// Routes for creating, updating, and deleting profiles
router.post('/profiles', studentsController.createProfile);
// Correct middleware sequence
router.patch('/profiles/:id', studentsController.getStudent1, studentsController.updateProfile);

router.delete('/profiles/:id', studentsController.getStudent2, studentsController.deleteProfile);
// Route for user signup
router.post('/signup', studentsController.signup);


module.exports = router;
