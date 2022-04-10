from rest_framework import viewsets, generics
from apps.orders.models import AcceptOrder, Order
from apps.orders.serializers import (CategorySerializer, 
    OrderSerializer,
    CreateOrderSerializer, 
    OrderCreateSerializer, 
    OrderDetailSerializer,
    AcceptOrderSerializer,
    AcceptOrderCreateSerializer)
from apps.categories.models import Category
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
# Create your views here.

class OrderAPIViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = self.queryset
        query_set = queryset.filter(status=False)
        return query_set

class OrderCreateAPIViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderCreateSerializer
    permission_classes = [AllowAny]

class CreateOrderAPIViewSet(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = CreateOrderSerializer

class OrderDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderDetailSerializer
    permission_classes = [IsAuthenticated]

class OrderUpdateAPIView(generics.UpdateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]


class OrderDeleteAPIView(generics.DestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

class AcceptOrderAPIView(viewsets.ModelViewSet):
    queryset = AcceptOrder.objects.all()
    serializer_class = AcceptOrderSerializer
    permission_classes = [AllowAny]

class AcceptOrderCreateAPIView(viewsets.ModelViewSet):
    queryset = AcceptOrder.objects.all()
    serializer_class = AcceptOrderCreateSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        serializer.save(status=True)