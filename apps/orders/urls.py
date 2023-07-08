from rest_framework.routers import DefaultRouter
from django.urls import path

from apps.orders import views


router = DefaultRouter()
router.register('order', views.OrderAPIViewSet, basename='order')
router.register('accept_order', views.AcceptOrderAPIViewSet, basename = 'accept_order')
router.register('review', views.ReviewAPIViewSet, basename = "review_api")


urlpatterns = [
    #order url
    path('update_completed/<int:pk>', views.OrderCompletedUpdateAPIView.as_view(), name = 'order_complated_update_api'),
]

urlpatterns += router.urls