

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bodyParser = require('body-parser');

// const authRoutes = require('./routes/auth'); // Import auth routes
// const productRoutes = require('./routes/products'); // Import product routes

// const app = express();
// const PORT = 5000;

// // Middleware
// app.use(express.json());  // Middleware to parse JSON requests
// app.use(cors());  // Enable Cross-Origin Resource Sharing
// app.use(bodyParser.json()); // Allows us to parse JSON data in the request body

// // MongoDB connection
// mongoose.connect('mongodb://localhost/ecommerce-db', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.error('Database connection error:', err));

// // Authentication routes
// app.use('/auth', authRoutes);  // Handle signup and login routes

// // Product routes
// app.use('/products', productRoutes);  // Handle product CRUD operations

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


// Your routes
app.use('/api', authRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost/ecommerce-db', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// User Model with bcrypt password hashing
const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model('User', userSchema);

// Signup Route
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error registering user', error });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Login error', error });
  }
});

// Product Model
const Product = mongoose.model('Product', new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
}));

// Product Routes (Add, Update, Delete, List)
app.post('/products', async (req, res) => { /* Product add code here */ });
app.put('/products/:id', async (req, res) => { /* Product update code here */ });
app.delete('/products/:id', async (req, res) => { /* Product delete code here */ });
app.get('/products', async (req, res) => { /* Product list code here */ });

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
