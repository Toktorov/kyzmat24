from rest_framework.routers import DefaultRouter

from apps.settings.views import SettingAPIViewSet, AboutUsAPIViewSet


router = DefaultRouter()
router.register('setting', SettingAPIViewSet, "api_settings")
router.register('about', AboutUsAPIViewSet, "api_about")

urlpatterns = router.urls