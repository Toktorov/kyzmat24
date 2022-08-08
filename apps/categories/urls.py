from rest_framework.routers import DefaultRouter
from apps.categories import views

router = DefaultRouter()
router.register('category', views.CategoryAPIViewSet, basename='category')
router.register('location', views.LocationAPIViewSet, basename='location')

urlpatterns = router.urls