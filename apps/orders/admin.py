from django.contrib import admin
from apps.orders.models import Order, AcceptOrder

# Register your models here.
class OrderFilterAdmin(admin.ModelAdmin):
    list_filter = ('status', )
    list_display = ('title', 'description', 'status' )
    search_fields = ('title', 'description', 'status')


admin.site.register(Order, OrderFilterAdmin)
admin.site.register(AcceptOrder)