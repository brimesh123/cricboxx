const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');

const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());





// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Make sure this directory exists
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });
  
  app.use(cors());
  app.use(bodyParser.json());
  
  app.use('/uploads', express.static('uploads')); // Serve static files
  
  // MongoDB connection and schema setup...
  app.get('/grounds', async (req, res) => {
    try {
      const grounds = await Ground.find();
      res.json(grounds);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.put('/grounds/:id', async (req, res) => {
    try {
      const ground = await Ground.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!ground) return res.status(404).send('Ground not found');
      res.json(ground);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get('/grounds/:id', async (req, res) => {
    try {
      const ground = await Ground.findById(req.params.id);
      if (!ground) return res.status(404).send('Ground not found');
      res.json(ground);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

  app.delete('/grounds/:id', async (req, res) => {
    try {
      const ground = await Ground.findByIdAndDelete(req.params.id);
      if (!ground) return res.status(404).send('Ground not found');
      res.status(200).send('Ground deleted successfully');
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });



  app.post('/grounds/:id/book', async (req, res) => {
    try {
      // This is a simplified example. You'd want to add checks to ensure the ground isn't already booked.
      const booking = new Booking({
        groundId: req.params.id,
        userId: req.body.userId, // Assuming you have user authentication
        date: req.body.date, // Booking date
      });
      await booking.save();
      res.status(201).json(booking);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  

  app.get('/grounds/:id', async (req, res) => {
    try {
      const ground = await Ground.findById(req.params.id);
      res.json(ground);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Update ground
  app.put('/grounds/:id', async (req, res) => {
    try {
      const updatedGround = await Ground.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedGround);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  

  app.post('/add-ground', upload.array('photos'), async (req, res) => {
    // req.files contains photos
    // You can now save these file paths along with other ground details to MongoDB
    const { groundName, location, pricePerHour, mobileNumber } = req.body;
    const photos = req.files.map(file => file.path); // Array of photo paths
  
    const newGround = new Ground({
      groundName,
      location,
      pricePerHour,
      mobileNumber,
      photos, // Assuming your Ground schema has a 'photos' field to store the paths
    });
  
    try {
      await newGround.save();
      res.status(201).json(newGround);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  

// MongoDB connection
mongoose.connect('mongodb+srv://brimesh:brimesh123@box.bhlzirl.mongodb.net/?retryWrites=true&w=majority&appName=box', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

// Schema
const Schema = mongoose.Schema;

const groundSchema = new Schema({
  groundName: String,
  location: String,
  pricePerHour: Number,
  mobileNumber: String,
  photos: [String],
});

const Ground = mongoose.model('Ground', groundSchema);

// Routes
app.post('/add-ground', async (req, res) => {
  const newGround = new Ground(req.body);
  try {
    await newGround.save();
    res.status(201).json(newGround);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
