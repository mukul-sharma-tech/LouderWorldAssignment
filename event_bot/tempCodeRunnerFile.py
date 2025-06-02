

import os
import asyncio
from dotenv import load_dotenv
import requests
from flask import Flask
from telegram import Update
from telegram.ext import ApplicationBuilder, CommandHandler, MessageHandler, filters, ContextTypes
import google.generativeai as genai
from hypercorn.asyncio import serve
from hypercorn.config import Config

# Load environment variables
load_dotenv()

TELEGRAM_TOKEN = os.getenv("TELEGRAM_TOKEN")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
BACKEND_API_URL = os.getenv("BACKEND_API_URL")

# Configure Gemini model
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')

# Initialize Flask app
app = Flask(__name__)

@app.route("/")
def index():
    return "Telegram Bot is running!"

# Telegram Bot Commands
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("Hi! 👋 Tell me what kind of events you like.")

async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_msg = update.message.text

    # Updated prompt for keyword extraction
    prompt = (
        f"You are an assistant that extracts a single keyword about a user's interest "
        f"for finding related events. Only return the keyword without any extra text. "
        f"For example, return 'painting' for 'I like painting'.\n\n"
        f"User input: '{user_msg}'\n"
        f"Keyword:"
    )

    try:
        classification = model.generate_content(prompt).text.strip()
        keyword = classification.split(",")[0].split()[0].lower()
        print(f"User: {user_msg} | Gemini: '{classification}' -> Keyword: '{keyword}'")
    except Exception as e:
        print(f"Error with Gemini API: {e}")
        await update.message.reply_text("Sorry, I'm having trouble processing your request.")
        return

    try:
        resp = requests.get(f"{BACKEND_API_URL}/api/event-data", params={"keyword": keyword})
        resp.raise_for_status()
        events = resp.json()
    except Exception as e:
        print(f"Error fetching events: {e}")
        await update.message.reply_text("Sorry, I am having trouble connecting to the events database.")
        return

    if events:
        response = f"Here are some events matching *{keyword}*:\n\n"
        for e in events:
            response += (
                f"🎉 *{e['title']}*\n"
                f"📅 {e['date']}\n"
                f"📍 {e['location']}\n"
                f"🔗 [Link]({e['link']})\n\n"
            )
    else:
        response = f"Sorry! I couldn't find any events for interest: *{keyword}* right now."

    await update.message.reply_text(response, parse_mode='Markdown')

# Run Telegram bot
async def run_bot():
    application = ApplicationBuilder().token(TELEGRAM_TOKEN).build()
    application.add_handler(CommandHandler("start", start))
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))

    await application.initialize()
    await application.start()
    await application.updater.start_polling()
    print("Bot polling started...")

    try:
        while True:
            await asyncio.sleep(1)
    except KeyboardInterrupt:
        print("Bot shutting down...")
    finally:
        await application.updater.stop()
        await application.stop()
        await application.shutdown()

# Run Flask server
async def run_flask():
    config = Config()
    port = int(os.environ.get("PORT", 8000))
    config.bind = [f"0.0.0.0:{port}"]
    await serve(app, config)

# Run both Flask and Bot
async def main():
    await asyncio.gather(run_flask(), run_bot())

if __name__ == "__main__":
    asyncio.run(main())
