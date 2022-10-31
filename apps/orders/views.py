from rest_framework import viewsets, generics
from apps.orders.models import AcceptOrder, Order, Review
from apps.orders.serializers import (CategorySerializer, 
    OrderSerializer, CreateOrderSerializer, OrderCreateSerializer, 
    OrderDetailSerializer, AcceptOrderSerializer, AcceptOrderCreateSerializer,
    UpdateStatusSeriaizer, OrderAcceptUpdateSerializer, OrderCompletedSerializer,
    ReviewSerializer
    )
from django.shortcuts import render
from apps.categories.models import Category
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.response import Response
from rest_framework import status
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

    # def update_status_order(self,request, pk):
    #     try:
    #         order = Order.objects.get(self.queryset)
    #         if order:
    #             order.status = True
    #             order.save()
    #     except:
    #         return Response({'Вышла ошибка'}, status=status.HTTP_400_BAD_REQUEST)

class UpdateStatusSeriaizer(generics.UpdateAPIView):
    queryset = Order.objects.all()
    serializer_class = UpdateStatusSeriaizer
    permission_classes = (AllowAny, )

class ReviewAPIView(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = (AllowAny, )

def handler404(request, exception):
    response = render(request, "404/index.html")
    response.status_code = 404
    return response