from django.contrib import admin
from apps.categories.models import Category, Location

# Register your models here.
class CategoryFilterAdmin(admin.ModelAdmin):
    list_filter = ('content', )
    list_display = ('content',  )
    search_fields = ('content', )

admin.site.register(Category, CategoryFilterAdmin)
admin.site.register(Location)