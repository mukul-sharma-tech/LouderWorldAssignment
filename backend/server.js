// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();
// app.use(cors());
// app.use(express.json());

// const PORT = process.env.PORT || 5000;

// mongoose.connect(process.env.MONGO_URI)
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.log(err));

// // Event Schema
// const eventSchema = new mongoose.Schema({
//     title: String,
//     link: String,
//     date: String,
//     location: String
// });

// const Event = mongoose.model('Event', eventSchema);

// // API: Get all events
// app.get('/api/events', async (req, res) => {
//     const events = await Event.find({});
//     res.json(events);
// });

// // API: Get events by keyword search
// app.get('/api/event-data', async (req, res) => {
//     const keyword = req.query.keyword || '';
//     try {
//         const events = await Event.find({
//             title: { $regex: keyword, $options: 'i' }
//         });
//         res.json(events);
//     } catch (error) {
//         res.status(500).json({ error: 'Server error' });
//     }
// });


// // API: Save email when user opts in
// const emailSchema = new mongoose.Schema({
//     email: String,
//     eventId: mongoose.Schema.Types.ObjectId,
//     timestamp: { type: Date, default: Date.now },
// });
// const EmailOptIn = mongoose.model('EmailOptIn', emailSchema);

// app.post('/api/optin', async (req, res) => {
//     const { email, eventId } = req.body;
//     if (!email || !eventId) return res.status(400).json({ msg: 'Missing email or eventId' });

//     await EmailOptIn.create({ email, eventId });
//     res.json({ msg: 'Email saved' });
// });

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`)
//     console.log(`Visit http://localhost:${PORT}/api/events to see events`);
// });









// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const nodemailer = require('nodemailer');
// const crypto = require('crypto');

// const app = express();
// app.use(cors());
// app.use(express.json());

// const PORT = process.env.PORT || 5000;

// // Configure Nodemailer transporter
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// mongoose.connect(process.env.MONGO_URI)
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.log(err));

// // Event Schema
// const eventSchema = new mongoose.Schema({
//     title: String,
//     link: String,
//     date: String,
//     location: String,
//     description: String
// });

// const Event = mongoose.model('Event', eventSchema);

// // OTP Schema
// const otpSchema = new mongoose.Schema({
//     email: String,
//     otp: String,
//     eventId: mongoose.Schema.Types.ObjectId,
//     expiresAt: { type: Date, default: Date.now, expires: 600 } // 10 minutes expiration
// });
// const OTP = mongoose.model('OTP', otpSchema);

// // Updated EmailOptIn Schema with DOB
// const emailSchema = new mongoose.Schema({
//     email: { type: String, required: true },
//     eventId: { type: mongoose.Schema.Types.ObjectId, required: true },
//     dateOfBirth: { type: Date, required: true },
//     verified: { type: Boolean, default: false },
//     timestamp: { type: Date, default: Date.now },
// });
// const EmailOptIn = mongoose.model('EmailOptIn', emailSchema);

// // Generate OTP
// const generateOTP = () => {
//     return crypto.randomInt(100000, 999999).toString();
// };

// // Send OTP Email
// const sendOTPEmail = async (email, otp) => {
//     const mailOptions = {
//         from: process.env.EMAIL_USER,
//         to: email,
//         subject: 'Your Event Registration OTP',
//         html: `
//             <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//                 <h2 style="color: #4a4a4a;">Event Registration Verification</h2>
//                 <p>Your OTP for event registration is:</p>
//                 <h1 style="background: #f0f0f0; padding: 10px 20px; display: inline-block; border-radius: 4px;">${otp}</h1>
//                 <p>This OTP is valid for 10 minutes.</p>
//                 <p>If you didn't request this, please ignore this email.</p>
//             </div>
//         `
//     };

//     await transporter.sendMail(mailOptions);
// };

// // API: Get all events
// app.get('/api/events', async (req, res) => {
//     try {
//         const events = await Event.find({});
//         res.json(events);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch events' });
//     }
// });

// // API: Send OTP for verification
// app.post('/api/send-otp', async (req, res) => {
//     const { email, eventId, dateOfBirth } = req.body;
    
//     if (!email || !eventId || !dateOfBirth) {
//         return res.status(400).json({ error: 'Email, event ID and date of birth are required' });
//     }

//     try {
//         // Check if email is already registered for this event
//         const existingRegistration = await EmailOptIn.findOne({ email, eventId });
//         if (existingRegistration) {
//             return res.status(400).json({ error: 'This email is already registered for this event' });
//         }

//         // Generate OTP
//         const otp = generateOTP();
        
//         // Delete any existing OTPs for this email and event
//         await OTP.deleteMany({ email, eventId });
        
//         // Save new OTP to database
//         await OTP.create({ email, otp, eventId });
        
//         // Send OTP email
//         await sendOTPEmail(email, otp);
        
//         res.json({ success: true, message: 'OTP sent successfully' });
//     } catch (error) {
//         console.error('Error sending OTP:', error);
//         res.status(500).json({ error: 'Failed to send OTP' });
//     }
// });

// // API: Verify OTP and complete registration
// app.post('/api/verify-otp', async (req, res) => {
//     const { email, otp, eventId, dateOfBirth } = req.body;
    
//     if (!email || !otp || !eventId || !dateOfBirth) {
//         return res.status(400).json({ error: 'All fields are required' });
//     }

//     try {
//         // Find and verify OTP
//         const otpRecord = await OTP.findOne({ email, otp, eventId });
        
//         if (!otpRecord) {
//             return res.status(400).json({ error: 'Invalid OTP or OTP expired' });
//         }
        
//         // Delete the used OTP
//         await OTP.deleteOne({ _id: otpRecord._id });
        
//         // Save user registration with DOB
//         await EmailOptIn.create({ 
//             email, 
//             eventId, 
//             dateOfBirth: new Date(dateOfBirth),
//             verified: true 
//         });
        
//         res.json({ success: true, message: 'Registration successful' });
//     } catch (error) {
//         console.error('Error verifying OTP:', error);
//         res.status(500).json({ error: 'Failed to verify OTP' });
//     }
// });

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//     console.log(`Visit http://localhost:${PORT}/api/events to see events`);
// });




require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Event Schema
// const eventSchema = new mongoose.Schema({
//   title: String,
//   link: String,
//   date: String,
//   location: String,
//   description: String,
// });

const eventSchema = new mongoose.Schema({
  title: String,
  link: String,
  date: String,
  location: String,
  image: String,
});

const Event = mongoose.model('Event', eventSchema);

// OTP Schema
const otpSchema = new mongoose.Schema({
  email: String,
  otp: String,
  eventId: mongoose.Schema.Types.ObjectId,
  expiresAt: { type: Date, default: Date.now, expires: 600 } // 10 minutes
});
const OTP = mongoose.model('OTP', otpSchema);

// Email Registration Schema
const emailSchema = new mongoose.Schema({
  email: { type: String, required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, required: true },
  dateOfBirth: { type: Date, required: true },
  verified: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now },
});
const EmailOptIn = mongoose.model('EmailOptIn', emailSchema);

// Generate a 6-digit OTP
const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

// Send OTP email
const sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your Event Registration OTP',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4a4a4a;">Event Registration Verification</h2>
        <p>Your OTP for event registration is:</p>
        <h1 style="background: #f0f0f0; padding: 10px 20px; display: inline-block; border-radius: 4px;">${otp}</h1>
        <p>This OTP is valid for 10 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};

// Get all events
app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find({});
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// Send OTP (allows repeated logins)
app.post('/api/send-otp', async (req, res) => {
  const { email, eventId, dateOfBirth } = req.body;

  if (!email || !eventId || !dateOfBirth) {
    return res.status(400).json({ error: 'Email, event ID and date of birth are required' });
  }

  try {
    const otp = generateOTP();

    // Remove existing OTPs
    await OTP.deleteMany({ email, eventId });

    // Save new OTP
    await OTP.create({ email, otp, eventId });

    // Send OTP via email
    await sendOTPEmail(email, otp);

    res.json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
});

// Verify OTP (upserts user registration)
app.post('/api/verify-otp', async (req, res) => {
  const { email, otp, eventId, dateOfBirth } = req.body;

  if (!email || !otp || !eventId || !dateOfBirth) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const otpRecord = await OTP.findOne({ email, otp, eventId });

    if (!otpRecord) {
      return res.status(400).json({ error: 'Invalid OTP or OTP expired' });
    }

    // Delete used OTP
    await OTP.deleteOne({ _id: otpRecord._id });

    // Create or update registration
    await EmailOptIn.findOneAndUpdate(
      { email, eventId },
      {
        email,
        eventId,
        dateOfBirth: new Date(dateOfBirth),
        verified: true,
        timestamp: new Date()
      },
      { upsert: true, new: true }
    );

    res.json({ success: true, message: 'Registration successful' });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ error: 'Failed to verify OTP' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT}/api/events to see events`);
});
