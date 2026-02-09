// import app from "./app.js";

// // For Vercel serverless - export the app
// export default app;

// // For local development only
// if (process.env.NODE_ENV !== 'production') {
//   app.listen(process.env.PORT, () => {
//     console.log(`SERVER HAS STARTED AT PORT ${process.env.PORT}`);
//   });
// }

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const notificationRoutes = require('./routes/notificationRoutes');
const eventRoutes = require('./routes/eventRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

// Add middleware
app.use((req, res, next) => {
  if (!isConnected) {
    connectToMongoDB();
  }
  next();
});

app.use('/api/events', eventRoutes);
app.use('/api/notifications', notificationRoutes);

// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// do not use app.listen() in vercel
module.exports = app;