from django.contrib import admin
from apps.orders.models import Order, AcceptOrder

# Register your models here.
admin.site.register(Order)
admin.site.register(AcceptOrder)