from django.contrib import admin
from apps.categories.models import Category, Location

# Register your models here.
@admin.register(Category)
class CategoryFilterAdmin(admin.ModelAdmin):
    list_filter = ('content', )
    list_display = ('content',  )
    search_fields = ('content', )

@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    list_display = ('title', 'location_self')