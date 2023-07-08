from django.contrib import admin
from apps.users.models import User, Contact, Media

# Register your models here.
@admin.register(User)
class UserFilterAdmin(admin.ModelAdmin):
    list_display = ('username',  'description', 'verifed', 'is_active', 'is_staff', 'status_user', 'another')
    list_filter = ('username', )
    search_fields = ('username', )

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'src', 'user')
    search_fields = ('name', 'src', 'user__username')

@admin.register(Media)
class MediaAdmin(admin.ModelAdmin):
    list_display = ('name', 'file', 'src', 'user')
    search_fields = ('name', 'file', 'src', 'user__username')