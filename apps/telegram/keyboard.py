from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton

buttons = [
    InlineKeyboardButton('Принять', callback_data='accept'),
    InlineKeyboardButton('Отказать', callback_data='refuse')
]

inline = InlineKeyboardMarkup().add(*buttons)