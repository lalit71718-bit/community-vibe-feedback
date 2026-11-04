const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// importing the route files
const feedbackRoutes = require('./routes/feedbackRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// middleare configurations
app.use(cors());
app.use(express.json());

app.use('/api/feedback', feedbackRoutes);

//connect your mongodb and fire up the server
mongoose.connect(process.env.MONGO_URI).then(() =>{
    console.log("Successfully connected to MongoDB!");
    app.listen(PORT, () =>{
        console.log(`Server is running live on port ${PORT}`);
    });
}).catch((err) => {
    console.error("Database connection failed:", err);
});

