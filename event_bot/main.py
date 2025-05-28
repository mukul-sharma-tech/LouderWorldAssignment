# import os
# import requests
# from dotenv import load_dotenv
# from telegram import Update
# from telegram.ext import ApplicationBuilder, CommandHandler, MessageHandler, filters, ContextTypes
# import google.generativeai as genai

# # Load env vars
# load_dotenv()
# BOT_TOKEN = os.getenv("TELEGRAM_TOKEN")
# BACKEND_API = os.getenv("BACKEND_API_URL")
# genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# # Gemini model setup
# model = genai.GenerativeModel('gemini-1.5-flash')

# async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
#     await update.message.reply_text("Hi! 👋 Tell me what kind of events you like.")

# async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
#     user_msg = update.message.text

#     # Step 1: Use Gemini to classify user interest as a keyword
#     prompt = f"Extract a simple keyword for event search from this input: '{user_msg}'"
#     classification = model.generate_content(prompt).text.strip()

#     print(f"User: {user_msg} | Classified interest: {classification}")

#     # Step 2: Fetch events matching the classified keyword
#     try:
#         resp = requests.get(f"{BACKEND_API}/api/event-data", params={"keyword": classification})
#         resp.raise_for_status()
#         events = resp.json()
#     except Exception as e:
#         await update.message.reply_text("Sorry, I am having trouble connecting to the events database.")
#         return

#     # Step 3: Build response
#     if events:
#         response = f"Here are some events matching **{classification}**:\n\n"
#         for e in events:
#             response += (
#                 f"🎉 *{e['title']}*\n"
#                 f"📅 {e['date']}\n"
#                 f"📍 {e['location']}\n"
#                 f"🔗 [Link]({e['link']})\n\n"
#             )
#     else:
#         response = "Sorry! I couldn't find any events for that interest right now."

#     await update.message.reply_markdown(response)

# # Main
# app = ApplicationBuilder().token(BOT_TOKEN).build()
# app.add_handler(CommandHandler("start", start))
# app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))

# print("Bot running...")
# app.run_polling()



import os
import threading
import asyncio
from dotenv import load_dotenv
import requests
from flask import Flask
from telegram import Update
from telegram.ext import ApplicationBuilder, CommandHandler, MessageHandler, filters, ContextTypes
import google.generativeai as genai

# Load env vars from .env file
load_dotenv()

TELEGRAM_TOKEN = os.getenv("TELEGRAM_TOKEN")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
BACKEND_API_URL = os.getenv("BACKEND_API_URL")

# Configure Gemini AI
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')

app = Flask(__name__)

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("Hi! 👋 Tell me what kind of events you like.")

async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_msg = update.message.text

    prompt = f"Extract a simple keyword for event search from this input: '{user_msg}'"
    classification = model.generate_content(prompt).text.strip()

    print(f"User: {user_msg} | Classified interest: {classification}")

    try:
        resp = requests.get(f"{BACKEND_API_URL}/api/event-data", params={"keyword": classification})
        resp.raise_for_status()
        events = resp.json()
    except Exception:
        await update.message.reply_text("Sorry, I am having trouble connecting to the events database.")
        return

    if events:
        response = f"Here are some events matching **{classification}**:\n\n"
        for e in events:
            response += (
                f"🎉 *{e['title']}*\n"
                f"📅 {e['date']}\n"
                f"📍 {e['location']}\n"
                f"🔗 [Link]({e['link']})\n\n"
            )
    else:
        response = "Sorry! I couldn't find any events for that interest right now."

    await update.message.reply_markdown(response)

def run_bot():
    # Create a new event loop for this thread
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    
    try:
        # Build the application
        application = ApplicationBuilder().token(TELEGRAM_TOKEN).build()
        application.add_handler(CommandHandler("start", start))
        application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))
        
        print("Bot running...")
        
        # Run the polling in the new event loop
        loop.run_until_complete(application.run_polling())
    except Exception as e:
        print(f"Bot error: {e}")
    finally:
        loop.close()

@app.route("/")
def index():
    return "Telegram Bot is running!"

if __name__ == "__main__":
    # Run bot polling in background thread
    bot_thread = threading.Thread(target=run_bot, daemon=True)
    bot_thread.start()

    # Run Flask webserver for Render
    port = int(os.environ.get("PORT", 8000))
    app.run(host="0.0.0.0", port=port)