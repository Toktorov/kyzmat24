from django.contrib import admin
from apps.users.models import User

# Register your models here.
class UserFilterAdmin(admin.ModelAdmin):
    list_filter = ('username', )
    list_display = ('username',  'description', 'phone_number')
    search_fields = ('username', )

admin.site.register(User, UserFilterAdmin)