from django.conf import settings
from aiogram import Bot, Dispatcher, types, executor
from asgiref.sync import sync_to_async

from apps.telegram.models import TelegramUser
from apps.telegram.keyboard import inline
from apps.orders.models import Order

# Create your views here.
bot = Bot(settings.TELEGRAM_TOKEN)
dp = Dispatcher(bot)

@dp.message_handler(commands=['start'])
async def start(message:types.Message):
    user = await sync_to_async(TelegramUser.objects.get_or_create)(
        user_id=message.from_user.id,
        username=message.from_user.username,
        first_name=message.from_user.first_name,
        last_name=message.from_user.last_name,
        chat_id=message.chat.id
    )
    await message.answer(f"Здравствуйте, {message.from_user.full_name}")

@dp.callback_query_handler(lambda call: call)
async def all_inline(call:types.Message):
    if call.data == 'accept':
        await check_order(call, 'accept')
    if call.data == 'refuse':
        await check_order(call, 'refuse')

async def check_order(call, type:str):
    order_id = call['message']['text'].split()[2].replace("#", '')
    order = await sync_to_async(Order.objects.get)(id=int(order_id))
    print(order)
    if type == 'accept':
        print('accept')
        order.status=True
        await sync_to_async(order.save)()
    elif type == 'refuse':
        print("delete")
        await sync_to_async(order.delete)()
    await bot.delete_message(call['message']['chat']['id'], call['message']['message_id'])

async def send_order(chat_id: int, text: str):
    await bot.send_message(chat_id=chat_id, text=text, reply_markup=inline)