from django.shortcuts import render
from rest_framework import generics
from rest_framework.viewsets import GenericViewSet
from rest_framework import mixins
from rest_framework.permissions import AllowAny, IsAdminUser
import asyncio

from apps.orders.models import AcceptOrder, Order, Review
from apps.orders import serializers
from apps.telegram.views import send_order
# Create your views here.

class OrderAPIViewSet(GenericViewSet,
                      mixins.ListModelMixin,
                      mixins.RetrieveModelMixin,
                      mixins.CreateModelMixin,
                      mixins.UpdateModelMixin,
                      mixins.DestroyModelMixin):
    queryset = Order.objects.all()
    serializer_class = serializers.OrderSerializer
    permission_classes = (AllowAny, )

    def get_queryset(self):
        return self.queryset.filter(status=False)

    def perform_create(self, serializer):
        order = serializer.validated_data
        message = f"Новый заказ\nОписание: {order['description']}\nTel: {order['tel']}\nEmail: {order['email']}\nЛокация: {order['location']}\nКатегория: {order['category']}\nStatus: False"
        asyncio.run(send_order(-1001956980852, f'{message}'))
        return serializer.save(user=self.request.user)
    
    def get_serializer_class(self):
        if self.action in ('create', ):
            return serializers.OrderCreateSerializer
        if self.action in ('retrieve', ):
            return serializers.OrderDetailSerializer
        return serializers.OrderSerializer
    
    def get_permissions(self):
        if self.action in ('update', 'partial_update', 'destroy', ):
            return (IsAdminUser(), )        
        return (AllowAny(), )
    

class OrderCompletedUpdateAPIView(generics.UpdateAPIView):
    queryset = Order.objects.all()
    serializer_class = serializers.OrderCompletedSerializer
    permission_classes = (AllowAny, )

#Accept
class AcceptOrderAPIViewSet(GenericViewSet,
                            mixins.ListModelMixin,
                            mixins.RetrieveModelMixin,
                            mixins.CreateModelMixin,
                            mixins.UpdateModelMixin,
                            mixins.DestroyModelMixin):
    queryset = AcceptOrder.objects.all()
    serializer_class = serializers.OrderAcceptOrderSerializer
    permission_classes = (AllowAny(), )

    def get_serializer_class(self):
        if self.action in ('create', ):
            return serializers.AcceptOrderCreateSerializer
        return serializers.OrderAc

    def perform_create(self, serializer):
        obj = serializer.save()
        accept_order = AcceptOrder.objects.get(id = obj.id)
        accept_order.order.status = True 
        accept_order.order.save()

#Review
class ReviewAPIViewSet(GenericViewSet,
                       mixins.ListModelMixin,
                       mixins.RetrieveModelMixin,
                       mixins.CreateModelMixin,
                       mixins.UpdateModelMixin,
                       mixins.DestroyModelMixin):
    queryset = Review.objects.all()
    serializer_class = serializers.ReviewSerializer
    permission_classes = (AllowAny(), )

def handler404(request, exception):
    response = render(request, "404/index.html")
    response.status_code = 404
    return response