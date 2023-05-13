from rest_framework.viewsets import GenericViewSet
from rest_framework import mixins

from apps.settings.models import Setting, AboutUs
from apps.settings.serializers import SettingSerializer, AboutUsSerializer

# Create your views here.
class SettingAPIViewSet(GenericViewSet,
                        mixins.ListModelMixin):
    queryset = Setting.objects.all()
    serializer_class = SettingSerializer

    def get_queryset(self):
        return self.queryset.all()[::-1]
    
class AboutUsAPIViewSet(GenericViewSet,
                        mixins.ListModelMixin):
    queryset = AboutUs.objects.all()
    serializer_class = AboutUsSerializer

    def get_queryset(self):
        return self.queryset.all()[::-1]