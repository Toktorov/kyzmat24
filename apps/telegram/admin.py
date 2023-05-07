from django.contrib import admin

from apps.telegram.models import TelegramUser

# Register your models here.
@admin.register(TelegramUser)
class TelegramUserAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'username', 'first_name', 'last_name', 'chat_id', 'created')
    search_fields = ('user_id', 'username', 'first_name', 'last_name', 'chat_id')
    list_per_page = 20