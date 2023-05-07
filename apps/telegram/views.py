from django.shortcuts import render
from django.conf import settings
from aiogram import Bot, Dispatcher, types, executor
from asgiref.sync import sync_to_async

from apps.telegram.models import TelegramUser

# Create your views here.
bot = Bot(settings.TELEGRAM_TOKEN)
dp = Dispatcher(bot)

@dp.message_handler(commands=['start'])
async def start(message: types.Message):
    user = await sync_to_async(TelegramUser.objects.get_or_create)(
        user_id=message.from_user.id,
        username=message.from_user.username,
        first_name=message.from_user.first_name,
        last_name=message.from_user.last_name,
        chat_id=message.chat.id
    )
    await message.answer(f"Здравствуйте, {message.from_user.full_name}")

