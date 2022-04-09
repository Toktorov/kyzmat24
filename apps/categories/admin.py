from django.contrib import admin
from apps.categories.models import Category, Location

# Register your models here.
admin.site.register(Category)
admin.site.register(Location)