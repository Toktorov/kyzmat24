from rest_framework import serializers
from apps.orders.models import AcceptOrder, Order
from apps.categories.models import Category
from apps.categories.serializers import CategorySerializerList
from apps.users.models import User
from apps.users.serializers import UserSerializer


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
    
    def get_serializer_class(self):
        if self.status == True:
            return OrderSerializer
        elif self.action == False:
            return OrderUserSerializer
    
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

class AcceptOrderSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only = True)
    order = OrderSerializer(read_only = True)
    class Meta:
        model = AcceptOrder
        fields = "__all__"

class AcceptOrderCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcceptOrder
        fields = "__all__"