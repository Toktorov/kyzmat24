from rest_framework import viewsets, generics
from apps.orders.models import Order, Contact, Media
from apps.orders.serializers import (CategorySerializer, 
    OrderSerializer, ContactSerializer, 
    MediaSerializer, CreateOrderSerializer, 
    OrderCreateSerializer, OrderDetailSerializer)
from apps.categories.models import Category
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
# Create your views here.

class OrderAPIViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

class OrderCreateAPIViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderCreateSerializer
    permission_classes = [AllowAny]


class ContactAPIViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    permission_classes = [IsAuthenticated]

class MediaAPIViewSet(viewsets.ModelViewSet):
    queryset = Media.objects.all()
    serializer_class = MediaSerializer
    permission_classes = [IsAuthenticated]

class CreateOrderAPIViewSet(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = CreateOrderSerializer

class OrderDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderDetailSerializer
    permission_classes = [IsAuthenticated]