require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Event Schema
const eventSchema = new mongoose.Schema({
    title: String,
    link: String,
    date: String,
    location: String
});

const Event = mongoose.model('Event', eventSchema);

// API: Get all events
app.get('/api/events', async (req, res) => {
    const events = await Event.find({});
    res.json(events);
});

// API: Get events by keyword search
app.get('/api/event-data', async (req, res) => {
    const keyword = req.query.keyword || '';
    try {
        const events = await Event.find({
            title: { $regex: keyword, $options: 'i' }
        });
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});


// API: Save email when user opts in
const emailSchema = new mongoose.Schema({
    email: String,
    eventId: mongoose.Schema.Types.ObjectId,
    timestamp: { type: Date, default: Date.now },
});
const EmailOptIn = mongoose.model('EmailOptIn', emailSchema);

app.post('/api/optin', async (req, res) => {
    const { email, eventId } = req.body;
    if (!email || !eventId) return res.status(400).json({ msg: 'Missing email or eventId' });

    await EmailOptIn.create({ email, eventId });
    res.json({ msg: 'Email saved' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    console.log(`Visit http://localhost:${PORT}/api/events to see events`);
});


