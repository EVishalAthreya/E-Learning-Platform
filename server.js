const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/course/s_tudent', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a User schema
const userSchema = new mongoose.Schema({
  Email: String,
  password: String,
});

// Create a User model
const User = mongoose.model('User', userSchema);

// Middleware to parse incoming JSON data
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Login route
app.post('login.html', async (req, res) => {
  try {
    const user = await User.findOne({
      Email: req.body.Email,
      password: req.body.password,
    });

    if (user) {
      res.status(200).send('Login successful!');
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
