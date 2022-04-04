from attr import field
from rest_framework import serializers
from apps.orders.models import AcceptOrder, Order
from apps.categories.models import Category
from apps.categories.serializers import CategorySerializerList
from apps.users.models import User


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
    category = CategorySerializer(read_only = True)
    # order_user = serializers.ReadOnlyField(source='order_user.username')
    
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

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id', 'username', 'phone_number', 'email', 'first_name', 'last_name',
            'profile_image',
        )

class AcceptOrderSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only = True)
    order = OrderSerializer(read_only = True)
    class Meta:
        model = AcceptOrder
        fields = "__all__"