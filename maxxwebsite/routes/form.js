const express = require('express');
const router = express.Router();
const Form = require('../models/Form'); // Import the Form model

// POST request to submit a review
router.post('/', async (req, res) => {
    try {
      console.log(req.body);  // Log the incoming request body to see the data
  
      const { name, profilePic, experience } = req.body;
  
      if (!name || !profilePic || !experience) {
        return res.status(400).json({ message: 'Missing required fields.' });
      }
  
      const newForm = new Form({
        name,
        profilePic,
        experience,
      });
  
      await newForm.save(); // Save the review to the database
      res.status(201).json({ message: 'Review submitted successfully!' });
    } catch (error) {
      console.error(error); // Log detailed error
      res.status(500).json({ message: 'An error occurred while submitting the review.' });
    }
  });
  

// GET request to fetch all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Form.find(); // Fetch all reviews from the database
    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching reviews.' });
  }
});

module.exports = router;
