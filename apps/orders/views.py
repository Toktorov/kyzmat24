from rest_framework import viewsets, generics
from apps.orders.models import AcceptOrder, Order
from apps.orders.serializers import (CategorySerializer, 
    OrderSerializer, CreateOrderSerializer, OrderCreateSerializer, 
    OrderDetailSerializer, AcceptOrderSerializer, AcceptOrderCreateSerializer,
    UpdateStatusSeriaizer, OrderAcceptUpdateSerializer, OrderCompletedSerializer
    )
from apps.categories.models import Category
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
# Create your views here.

class OrderAPIViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = (AllowAny, )

    def get_queryset(self):
        queryset = self.queryset
        query_set = queryset.filter(status=False)
        return query_set

class OrderCreateAPIViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderCreateSerializer
    permission_classes = (AllowAny,)

class CreateOrderAPIViewSet(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = CreateOrderSerializer

class OrderDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderDetailSerializer
    permission_classes = (AllowAny,)

class OrderUpdateAPIView(generics.UpdateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = (AllowAny,)

class OrderCompletedUpdateAPIView(generics.UpdateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderCompletedSerializer
    permission_classes = (AllowAny, )

class AcceptOrderUpdateAPIView(generics.UpdateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderAcceptUpdateSerializer
    permission_classes = (AllowAny, )

class OrderDeleteAPIView(generics.DestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = (AllowAny, )

class AcceptOrderAPIView(viewsets.ModelViewSet):
    queryset = AcceptOrder.objects.all()
    serializer_class = AcceptOrderSerializer
    permission_classes = (AllowAny, )

class AcceptOrderCreateAPIView(generics.CreateAPIView):
    queryset = AcceptOrder.objects.all()
    serializer_class = AcceptOrderCreateSerializer
    permission_classes = (AllowAny, )

class UpdateStatusSeriaizer(generics.UpdateAPIView):
    queryset = Order.objects.all()
    serializer_class = UpdateStatusSeriaizer
    permission_classes = (AllowAny, )