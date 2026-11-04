const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

function generateHackathonReply(wifiQuality, communityVibe, venueRating) {
    let reply = "Thank you for participating in Community Vibe! ";

    if (wifiQuality === 'Frequently disconnected / Slow') {
        reply += "We sincerely apologize for the network issues you experienced; our tech team is already reviewing the router setup for next time. ";
    } else {
        reply += "We're glad the technical environment treated you well! ";
    }

    if (communityVibe === 'Inspirational & Collaborative') {
        reply += "It was amazing to see such high energy and collaboration among teams.";
    } else {
        reply += "We appreciate your honest insights on the event atmosphere.";
    }

    return reply;
}

// POST: Submit new feedback
router.post('/', async (req, res) => {
    try {
        const { name, email, venueRating, foodRating, wifiQuality, mentorshipSupport, communityVibe, comments } = req.body;

        if (!email || !venueRating || !foodRating || !wifiQuality || !mentorshipSupport || !communityVibe) {
            return res.status(400).json({ error: 'Please fill out all required fields.' });
        }

        const autoReply = generateHackathonReply(wifiQuality, communityVibe, Number(venueRating));

        const newFeedback = new Feedback({
            name: name || 'Anonymous Participant',
            email,
            venueRating: Number(venueRating),
            foodRating: Number(foodRating),
            wifiQuality,
            mentorshipSupport,
            communityVibe,
            comments,
            autoReply
        });

        const savedFeedback = await newFeedback.save();
        res.status(201).json(savedFeedback);
    } catch (err) {
        console.error('Save Error:', err);
        res.status(500).json({ error: err.message || 'Server error while saving feedback.' });
    }
});

// GET: Fetch all feedback entries
router.get('/', async (req, res) => {
    try {
        const feedbacks = await Feedback.find().sort({ createdAt: -1 });
        res.status(200).json(feedbacks);
    } catch (err) {
        res.status(500).json({ error: 'Server error while fetching feedback.' });
    }
});

// DELETE: Remove feedback entry
router.delete('/:id', async (req, res) => {
    try {
        await Feedback.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Feedback deleted successfully.' });
    } catch (err) {
        res.status(500).json({ error: 'Server error while deleting feedback.' });
    }
});

module.exports = router;