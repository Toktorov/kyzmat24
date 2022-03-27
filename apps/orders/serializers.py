from rest_framework import serializers
from apps.orders.models import Order, Contact, Media
from apps.categories.models import Category
from apps.categories.serializers import CategorySerializerList
from apps.users.models import User

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = "__all__"

class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = "__all__"

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

class CreateOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = "__all__"

class OrderUserSerializer(serializers.ModelSerializer):
    class Meta:
        models = User
        fields = ('username', )

class OrderSerializer(serializers.ModelSerializer):
    contact = ContactSerializer(many=True, source='contact_set.all', read_only=True)
    media = MediaSerializer(many = True,  source='media_set.all', read_only = True)
    category = CategorySerializer(read_only = True)
    order_user = serializers.ReadOnlyField(source='order_user.username')
    
    class Meta:
        model = Order
        fields = "__all__"

class OrderCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('description', 'tel', 'email', 'location', 'category')

class OrderDetailSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only = True)
    class Meta:
        model = Order
        fields = ("__all__")