const express = require('express');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

const formRoutes = require('./routes/form');


// Create an Express application
const app = express();
const PORT = 3000;

// MongoDB connection
mongoose
    .connect('mongodb+srv://madhabpadhi72:uPSVwOGcp6f2RXom@test-pro.tckxt.mongodb.net/?retryWrites=true&w=majority&appName=test-pro', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Could not connect to MongoDB:', err));

// MongoDB user schema
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
});
const User = mongoose.model('User', userSchema);

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, images, JS)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/data', express.static(path.join(__dirname, 'data')));

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static HTML page for home
app.get('/', (req, res) => {
    const homeFilePath = path.join(__dirname, 'studysync.html');
    
    console.log('Attempting to serve home page from:', homeFilePath);
    
    // Check if file exists before sending
    if (fs.existsSync(homeFilePath)) {
        res.sendFile(homeFilePath);
    } else {
        console.error('Home page file not found:', homeFilePath);
        res.status(404).send('Home page not found');
    }
});

// Dynamic route for other HTML files with error handling
app.get('/:page', (req, res) => {
    const page = req.params.page;
    const possibleFiles = [
        `${page}.html`,
        `${page}`,
        `${page}.studysync.html`,
        'studysync.html',
        'reviewpage.html',
        'price.html',
        'login.html',
        'login2.html'
    ];

    app.use('/api/reviews', formRoutes); // Set up your route for reviews

    
    // Try multiple possible file names
    for (let filename of possibleFiles) {
        const filePath = path.join(__dirname, filename);
        
        console.log(`Checking file path: ${filePath}`);
        
        if (fs.existsSync(filePath)) {
            console.log(`Serving file: ${filePath}`);
            return res.sendFile(filePath);
        }
    }
    
    // If no file found
    console.error(`No file found for page: ${page}`);
    res.status(404).send(`Page "${page}" not found`);
});

// Routes for rendering dynamic pages with EJS
app.get('/studysync', (req, res) => {
    res.render('studysync');
});

app.get('/pricing', (req, res) => {
    res.render('pricing');
});

app.get('/index', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

// Signup route
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username, password });
        if (user) {
            res.status(200).json({ message: 'Login successful', user });
        } else {
            res.status(400).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err);
    res.status(500).send('Something went wrong');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log('Project Root:', __dirname);
    console.log('Static file directories:');
    console.log('- /css     → CSS folder');
    console.log('- /js      → JavaScript folder');
    console.log('- /images  → Images folder');
    console.log('- /data    → JSON data folder');
});
