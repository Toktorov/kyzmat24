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
from distutils.util import strtobool
from rest_framework.response import Response
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

class AcceptOrderCreateAPIView(generics.CreateAPIView):
    queryset = AcceptOrder.objects.all()
    serializer_class = AcceptOrderCreateSerializer
    permission_classes = [AllowAny]

    def update_status(self, request, *args, **kwargs):
        if self.status:
            try:
                Order.objects.filter(user_id=request.user.id).update(status=strtobool(self.status))
                return Response({'Status': True})
            except ValueError as error:
                return Response({'Status': False, 'Errors': str(error)}, status=self.status.HTTP_400_BAD_REQUEST)

        return Response({'Status': False, 'Errors': 'Не указан аргумент state.'}, status=self.status.HTTP_400_BAD_REQUEST)