from rest_framework import serializers
from apps.orders.models import AcceptOrder, Order
from apps.categories.models import Category
from apps.categories.serializers import CategorySerializerList
from apps.users.models import User
from apps.users.serializers import UserSerializer
from rest_framework.fields import SerializerMethodField


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

# class AcceptOrderCreateSerializer(serializers.ModelSerializer):
#     def change_status(self, instance):
#         user = self.context['request'].user.id
#         order = instance.id
#         try:
#             return AcceptOrder.objects.filter(user=user, order=order).exists()
#         except Exception:
#             return False
#     status = SerializerMethodField(method_name='change_status')

#     class Meta:
#         model = AcceptOrder
#         fields = ('id', 'user', 'order', 'status')


class AcceptOrderCreateSerializer(serializers.ModelSerializer):

# returns true if user is authenticated and a Watching instance  
# exists with this user's id and this listing's id
    # def is_watched_by_user(self, instance):
    #     user = self.context['request'].user.id
    #     order = instance.id
    #     try:
    #         return AcceptOrder.objects.filter(user=user, order=order).exists()
    #     except Exception:
    #         return False

    # user_is_watching = SerializerMethodField(method_name='is_watched_by_user')

    class Meta:
        model = AcceptOrder
        fields = ('id', 'user', 'order')