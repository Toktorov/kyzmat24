from django.contrib import admin
from apps.users.models import User, Contact, Media

# Register your models here.
class UserFilterAdmin(admin.ModelAdmin):
    list_filter = ('username', )
    list_display = ('username',  'description', 'is_active', 'is_staff')
    search_fields = ('username', )

admin.site.register(User, UserFilterAdmin)
admin.site.register(Contact)
admin.site.register(Media)