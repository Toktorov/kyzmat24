from django.contrib import admin
from apps.orders.models import Order, AcceptOrder, Review

# Register your models here.
@admin.register(Order)
class OrderFilterAdmin(admin.ModelAdmin):
    list_filter = ('status', )
    list_display = ('title', 'description', 'status' )
    search_fields = ('title', 'description', 'status')

@admin.register(AcceptOrder)
class AcceptOrderAdmin(admin.ModelAdmin):
    list_display = ('user', 'order', 'created')

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('message', 'created')