from rest_framework.routers import DefaultRouter
from apps.orders import views
from django.urls import path, include


router = DefaultRouter()
router.register('order', views.OrderAPIViewSet, basename='order')
router.register('create_order', views.OrderCreateAPIViewSet, basename = 'create_order')
router.register('media', views.MediaAPIViewSet, basename='media')
router.register('contact', views.ContactAPIViewSet, basename='contact')

urlpatterns = [
    path('detail/<int:pk>', views.OrderDetailAPIView.as_view(), name = 'order_detail')
]

urlpatterns += router.urls