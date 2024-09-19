// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const cors = require('cors');

// const app = express();
// app.use(express.json());
// app.use(cors());

// // Connect to MongoDB
// const MONGO_URI = process.env.MONGO_URI;
// mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// // Define User model with validation
// const UserSchema = new mongoose.Schema({
//   username: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// const User = mongoose.model('User', UserSchema);

// const ProductSchema = new mongoose.Schema({
//   productName: { type: String, required: true },
//   expiryDate: { type: String, required: true },
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Reference to the user
// });

// const Product = mongoose.model('Product', ProductSchema);


// // JWT Secret Key
// const JWT_SECRET = process.env.JWT_SECRET;

// // Middleware to verify JWT token
// const authMiddleware = (req, res, next) => {
//   const token = req.headers['authorization'];
//   if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

//   try {
//     const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(401).json({ message: 'Token is not valid' });
//   }
// };

// // Sign Up route
// app.post('/signup', async (req, res) => {
//   const { username, email, password } = req.body;

//   try {
//     // Check if the user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: 'User already exists' });

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new user
//     const newUser = new User({ username, email, password: hashedPassword });
//     await newUser.save();

//     res.json({ message: 'User registered successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// });

// // Log In route
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: 'Invalid credentials' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//     // Generate JWT token
//     const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

//     res.json({ token });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// });

// // Route to add a product for the logged-in user
// app.post('/addProduct', authMiddleware, async (req, res) => {
//   const { productName, expiryDate } = req.body;

//   try {
//     const result = await Product.create({
//       productName,
//       expiryDate,
//       user: req.user.id
//     });

//     res.json({ message: 'Product added successfully', product: result });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// });

// // Route to get all products for the logged-in user
// app.get('/products', authMiddleware, async (req, res) => {
//   try {
//     const products = await Product.find({ user: req.user.id });
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// });


// // Delete product route (backend)
// app.delete('/deleteProduct/:id', authMiddleware, async (req, res) => {
//   try {
//     const productId = req.params.id;
//     const product = await Product.findOneAndDelete({ _id: productId, user: req.user.id });

//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     res.json({ message: 'Product deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// });


// // Protected routes
// app.get('/add-items', authMiddleware, (req, res) => {
//   res.json({ message: 'You can add items now' });
// });

// app.get('/expired', authMiddleware, (req, res) => {
//   res.json({ message: 'You can view expired items' });
// });

// app.get('/unexpired', authMiddleware, (req, res) => {
//   res.json({ message: 'You can view unexpired items' });
// });

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });


require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Define User model with validation
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', UserSchema);

// Define Product model with reference to the user
const ProductSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  expiryDate: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Reference to the user
});

const Product = mongoose.model('Product', ProductSchema);

// JWT Secret Key
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to verify JWT token
const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Sign Up route
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Log In route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT token
    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Route to add a product for the logged-in user
app.post('/addProduct', authMiddleware, async (req, res) => {
  const { productName, expiryDate } = req.body;

  try {
    const result = await Product.create({
      productName,
      expiryDate,
      user: req.user.id
    });

    res.json({ message: 'Product added successfully', product: result });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Route to get all products for the logged-in user
app.get('/products', authMiddleware, async (req, res) => {
  try {
    const products = await Product.find({ user: req.user.id });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Route to get unexpired products for the logged-in user
app.get('/unExpiredItems', authMiddleware, async (req, res) => {
  try {
    // Get today's date
    let todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    // Find the products that belong to the logged-in user
    const items = await Product.find({ user: req.user.id }); // Only fetch items for the current user

    let unexp = [];

    // Classify products as expired or unexpired
    for (let product of items) {
      let productExpiry = new Date(product.expiryDate);
      productExpiry.setHours(0, 0, 0, 0); // Set the time of productExpiry to 00:00:00 for accurate comparison

      // Only include unexpired products
      if (todayDate.getTime() <= productExpiry.getTime()) {
        unexp.push(product);
      }
    }

    // Return the unexpired items
    res.json({ unexp });
  } catch (error) {
    console.error('Error fetching unexpired items:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to get expired items for the logged-in user
app.get('/expiredItems', authMiddleware, async (req, res) => {
  try {
    // Get today's date
    let todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0); // Normalize today's date to midnight

    // Find the products that belong to the logged-in user
    const items = await Product.find({ user: req.user.id });

    let expiredItems = [];

    // Classify products as expired
    for (let product of items) {
      let productExpiry = new Date(product.expiryDate);
      productExpiry.setHours(0, 0, 0, 0); // Normalize the expiry date

      // Only include expired products
      if (todayDate.getTime() > productExpiry.getTime()) {
        expiredItems.push(product);
      }
    }

    // Return the expired items
    res.json({ expiredItems });
  } catch (error) {
    console.error('Error fetching expired items:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



// Delete product route (backend)
app.delete('/deleteProduct/:id', authMiddleware, async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findOneAndDelete({ _id: productId, user: req.user.id });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
