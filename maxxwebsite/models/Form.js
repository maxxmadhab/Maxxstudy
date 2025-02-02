const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,  // Profile picture URL
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Form = mongoose.model('Form', formSchema);

module.exports = Form;
