from rest_framework.routers import DefaultRouter
from apps.categories import views

router = DefaultRouter()
router.register('', views.CategoryAPIViewSet, basename='category')

urlpatterns = router.urls