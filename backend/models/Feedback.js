
const mongoose = require('mongoose');

const hackathonFeedbackSchema = new mongoose.Schema({
    name: { type: String, default: 'Anonymous Participant' },
    email: { type: String, required: true },

    venueRating: { type: Number, required: true, min: 1, max: 5 },
    foodRating: { type: Number, required: true, min: 1, max: 5 },

    wifiQuality: { 
        type: String, 
        required: true, 
        enum: ['Flawless / Fast', 'Mostly stable with minor drops', 'Frequently disconnected / Slow'] 
    },
    mentorshipSupport: { 
        type: String, 
        required: true, 
        enum: ['Extremely helpful & available', 'Available, but hard to get time', 'Scarcely available', 'Did not use'] 
    },
    communityVibe: { 
        type: String, 
        required: true, 
        enum: ['Inspirational & Collaborative', 'Chaotic but fun', 'Stressed / Disorganized', 'Neutral'] 
    },

    comments: { type: String },
    autoReply: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('HackathonFeedback', hackathonFeedbackSchema);
