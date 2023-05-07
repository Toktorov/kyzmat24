from django.shortcuts import render
from django.conf import settings
from aiogram import Bot, Dispatcher, types, executor

from apps.telegram.models import TelegramUser

# Create your views here.
bot = Bot(settings.TELEGRAM_TOKEN)
dp = Dispatcher(bot)

@dp.message_handler(commands=['start'])
async def start(message:types.Message):
    await message.answer(f"Здраствуйте, {message.from_user.full_name}")

def start_bot():
    executor.start_polling(dp, skip_updates=True)