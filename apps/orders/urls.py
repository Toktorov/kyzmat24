from rest_framework.routers import DefaultRouter
from apps.orders import views
from django.urls import path, include


router = DefaultRouter()
router.register('order', views.OrderAPIViewSet, basename='order')
router.register('create_order', views.OrderCreateAPIViewSet, basename = 'create_order')
router.register('media', views.MediaAPIViewSet, basename='media')
router.register('contact', views.ContactAPIViewSet, basename='contact')

urlpatterns = [
    #order
    path('detail/<int:pk>', views.OrderDetailAPIView.as_view(), name = 'order_detail'),
    path('delete/<int:pk>', views.OrderDeleteAPIView.as_view(), name = 'order_delete_api'),
    path('update/<int:pk>', views.OrderUpdateAPIView.as_view(), name = 'order_update_api'),

    #contact
    path('contact/delete/<int:pk>', views.ContactDeleteAPIView.as_view(), name = 'contact_delete_api'),
    path('contact/update/<int:pk>', views.ContactUpdateAPIView.as_view(), name = 'contact_update_api'),

    #media
    path('media/delete/<int:pk>', views.MediaDeleteAPIView.as_view(), name = 'media_delete_api'),
    path('media/update/<int:pk>', views.MediaUpdateAPIView.as_view(), name = 'media_update_api'),
]

urlpatterns += router.urls