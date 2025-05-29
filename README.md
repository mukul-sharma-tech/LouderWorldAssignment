# 🎟️ LouderWorld Event Management System - Sydney Edition

A comprehensive event management platform that scrapes Sydney events and provides AI-powered recommendations through a Telegram bot.

## 📋 Project Overview

This project consists of two main components:
- **Assignment 1 (Mandatory)**: Web scraper with React frontend for Sydney events
- **Assignment 2 (Optional)**: AI-powered Telegram bot for personalized event recommendations

## 🚀 Live Demo

- **🌍 Website**: [https://louder-world-assignment-ruby.vercel.app/](https://louder-world-assignment-ruby.vercel.app/)
- **🤖 Telegram Bot**: [@event_guide_bot](https://t.me/event_guide_bot)
- **💾 GitHub Repository**: [LouderWorldAssignment](https://github.com/mukul-sharma-tech/LouderWorldAssignment)

## 📁 Project Structure

```
📦 LouderWorldAssignment/
├── 📂 backend/
│   ├── 📂 models/
│   │   └── Event.js              # Event data model
│   ├── cron-job.js               # Daily auto-scraping scheduler
│   ├── scrape.js                 # Web scraper for Sydney events
│   ├── server.js                 # Express.js API server
│   ├── package.json              # Backend dependencies
│   ├── .env                      # Environment variables
│   └── .gitignore
│
├── 📂 event_bot/
│   ├── main.py                   # Telegram bot with AI integration
│   ├── requirements.txt          # Python dependencies
│   ├── runtime.txt               # Python runtime version
│   ├── .env                      # Bot environment variables
│   └── .gitignore
│
├── 📂 frontend/
│   ├── 📂 public/                # Static assets
│   ├── 📂 src/
│   │   ├── App.js                # Main React component
│   │   ├── App.css               # Application styles
│   │   ├── index.js              # React entry point
│   │   └── index.css             # Global styles
│   ├── package.json              # Frontend dependencies
│   └── .gitignore
│
└── README.md                     # Project documentation
```

## ✨ Features

### 🔍 Assignment 1: Web Event Scraper & Frontend

**Data Collection:**
- Scrapes events from [City of Sydney Events](https://whatson.cityofsydney.nsw.gov.au)
- Automated daily refresh at 8:00 AM using `node-cron`
- Event data stored in MongoDB database

**Frontend Features:**
- Responsive React.js interface with grid layout
- Advanced search and filtering by date and location
- Email collection modal for ticket inquiries
- User emails stored for future event notifications
- Clean, mobile-friendly design

### 🤖 Assignment 2: AI Event Bot

**Intelligent Recommendations:**
- Telegram bot powered by Google Gemini AI
- Natural language processing for user preferences
- Example: *"I like free music concerts on weekends"*
- AI extracts preferences and filters database accordingly
- Returns personalized event recommendations with direct links

**Technical Implementation:**
- Built with LangChain-style logic flow
- Real-time database querying
- Conversational AI interface

## 🛠️ Technology Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | React.js, HTML5, CSS3, JavaScript |
| **Backend** | Node.js, Express.js, MongoDB |
| **Web Scraping** | Cheerio, Axios |
| **AI Bot** | Python, Telegram Bot API, Google Gemini AI |
| **Automation** | node-cron |
| **Deployment** | Vercel (Frontend), Render (Backend) |

## 🚀 Local Development Setup

### Prerequisites
- Node.js (v16 or higher)
- Python 3.8+
- MongoDB database
- Telegram Bot Token
- Google Gemini AI API Key

### 1. Clone the Repository
```bash
git clone https://github.com/mukul-sharma-tech/LouderWorldAssignment.git
cd LouderWorldAssignment
```

### 2. Backend Setup
```bash
cd backend
npm install
npm start  # Server runs on http://localhost:5000
```

**Environment Variables (.env):**
```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start  # Application runs on http://localhost:3000
```

### 4. Telegram Bot Setup
```bash
cd event_bot
pip install -r requirements.txt
python main.py
```

**Bot Environment Variables (.env):**
```env
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
GEMINI_API_KEY=your_gemini_api_key
BACKEND_API_URL=your_backend_api_url
```

## 🎯 How It Works

### Event Scraping Process
1. **Automated Scraping**: Daily cron job fetches latest events
2. **Data Processing**: Events parsed and standardized
3. **Database Storage**: Clean data stored in MongoDB
4. **API Exposure**: RESTful endpoints for frontend consumption

### AI Recommendation Flow
1. **User Query**: Natural language input via Telegram
2. **AI Processing**: Gemini AI extracts preferences and intent
3. **Database Query**: Filtered search based on extracted criteria
4. **Response Generation**: Formatted event recommendations sent back

## 🏆 Key Achievements

- ✅ **Robust Web Scraping**: Handles dynamic content and inconsistent date formats
- ✅ **Responsive Design**: Mobile-first approach with clean UI/UX
- ✅ **AI Integration**: Smart event recommendations using natural language
- ✅ **Automated Operations**: Daily data refresh without manual intervention
- ✅ **Full-Stack Implementation**: Complete end-to-end solution

## 🚧 Challenges Overcome

- **Dynamic Content Parsing**: Handled JavaScript-heavy source website
- **Date Standardization**: Converted relative dates ("Today", "Tomorrow") to absolute dates
- **AI Accuracy**: Fine-tuned prompt engineering for better recommendations
- **Cross-Platform Compatibility**: Ensured consistent experience across devices

## 🔮 Future Enhancements

- **Multi-Source Scraping**: Expand to include more Sydney event websites
- **Push Notifications**: Real-time email alerts for new matching events
- **WebSocket Integration**: Live updates without page refresh
- **Mobile App**: React Native or Flutter implementation
- **Advanced Filtering**: More granular search options (price range, category, etc.)
- **User Profiles**: Personalized dashboards with saved preferences

## 📊 Project Status

| Component | Status | Description |
|-----------|--------|-------------|
| **Web Scraper** | ✅ Complete | Automated daily event collection |
| **REST API** | ✅ Complete | Full CRUD operations for events |
| **React Frontend** | ✅ Complete | Responsive UI with search/filter |
| **Email Collection** | ✅ Complete | Modal with database storage |
| **Cron Scheduler** | ✅ Complete | Daily automated updates |
| **Telegram Bot** | ✅ Complete | AI-powered recommendations |
| **Gemini AI Integration** | ✅ Complete | Natural language processing |

## 📄 API Documentation

### Base URL
```
Production: https://your-backend-url.com/api
Local: http://localhost:5000/api
```

### Endpoints
- `GET /events` - Retrieve all events
- `GET /events/search?q={query}` - Search events
- `GET /events/filter?date={date}&location={location}` - Filter events
- `POST /emails` - Store email for notifications

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- City of Sydney for providing public event data
- Google Gemini AI for powering intelligent recommendations
- Open-source community for the amazing tools and libraries

---

**🧑‍💻 Built with ❤️ by [Mukul Sharma](https://github.com/mukul-sharma-tech)**

*This project demonstrates full-stack development skills, AI integration, and modern web technologies for creating practical, user-focused applications.*
