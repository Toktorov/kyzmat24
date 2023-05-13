from django.contrib import admin

from apps.settings.models import Setting, AboutUs

# Register your models here.
@admin.register(Setting)
class SettingAdmin(admin.ModelAdmin):
    list_display = ['title', 'description', 'logo']

@admin.register(AboutUs)
class AboutUsAdmin(admin.ModelAdmin):
    list_display = ['title', 'description']