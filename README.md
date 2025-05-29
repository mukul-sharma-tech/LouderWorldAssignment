# 🎟️ LouderWorld Event Management System - Sydney Edition

> 🧠 Assignment 1: Mandatory  
> 🌐 Create a Web Page and Display Scraped Data Using Open-Source Tools  
> 🧪 Assignment 2: Optional  
> 🤖 AI-Powered Event Suggestion Bot (Telegram)

---

## 📁 Directory Structure

```bash
📦 LouderWorldAssignment
├── backend/
│   ├── models/
│       ├── Event.js
│   ├── cron-job.js        # Auto-scraping daily @ 8AM using node-cron
│   ├── scrape.js          # Scrapes events from City of Sydney website
│   ├── server.js          # Express.js backend API server
│   ├── package.json       # Backend dependencies
│   └── .gitignore
│   └── .env
│
├── event_bot/
│   ├── main.py            # Telegram bot with Gemini AI integration
│   ├── requirements.txt   # Python dependencies
│   └── runtime.txt
│   └── .gitignore
│   └── .env
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.js         # React UI with search, filter, email modal
│   │   └── App.css
│   │   └── index.js
│   │   └── index.css
│   ├── package.json       # Frontend dependencies
│   └── .gitignore
│
├── README.md              
```

> 🚀 Live Links
> 🌍 Website: https://louder-world-assignment-ruby.vercel.app/

> 🤖 Telegram Bot: https://t.me/event_guide_bot

> 💾 GitHub Repo: https://github.com/mukul-sharma-tech/LouderWorldAssignment

# Features Overview
##✅ Assignment 1: Web Event Scraper & Frontend
🔎 Scrapes Sydney events from:
https://whatson.cityofsydney.nsw.gov.au

⏰ Auto-refresh via node-cron @ 8:00AM daily

💾 Data stored in MongoDB

🖼️ React frontend with:

Responsive grid layout

Search & filter by date and location

"Get Tickets" → Email collection modal → Redirect

📩 Emails saved in DB for future notifications

##🤖 Assignment 2: AI Event Bot 
🧠 Telegram bot using Google Gemini AI and LangChain

📤 User sends: "I like free music concerts on weekends"

🔍 AI extracts preferences → Filters backend DB

📬 Sends back matching events w/ links

🤝 Built with LangChain-style logic (custom flow)

⚙️ Tech Stack
Frontend:     React.js, HTML5, CSS3
Backend:      Node.js, Express.js, MongoDB
Scraper:      Cheerio, Axios
Bot:          Python, Telegram API, Google Gemini AI
Automation:   node-cron

🔄 How to Run Locally
# 🧪 Clone the repo
```bash
git clone https://github.com/mukul-sharma-tech/LouderWorldAssignment.git
cd LouderWorldAssignment
```

# ⚙️ Backend Setup
```bash
cd backend
npm install
npm start   # Runs Express API @ localhost:5000
```

# 💻 Frontend Setup
```bash
cd frontend
npm install
npm start   # Runs React UI @ localhost:3000
```

# 🤖 Telegram Bot Setup
```bash
cd event_bot
pip install -r requirements.txt
python main.py  # Make sure your bot token is configured
```

🛠️ Challenges Faced
> 🗓️ Parsing inconsistent dates like "Today", "Tomorrow"
> 🔄 Handling dynamic content from JS-heavy source
> 📱 Making the site minimal but responsive
> 🤖 Ensuring AI gives accurate recommendations

🌱 Potential Improvements
> Add support for more Sydney event websites
> Push email notifications for new events
> Real-time updates using WebSocket
> Add mobile app (React Native or Flutter)

## ✅ Assignment Status
> Component	Status
> Scraper + API	✅ Done
> React Frontend	✅ Done
> Email Collection	✅ Done
> Cron Scheduler	✅ Done
> Telegram AI Bot	✅ Done
> Gemini AI Integration	✅ Done

> 🧑‍💻 Built with ❤️ by Mukul Sharma

