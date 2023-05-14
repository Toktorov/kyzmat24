from rest_framework.viewsets import GenericViewSet
from rest_framework import mixins
from rest_framework.permissions import AllowAny, IsAdminUser

from apps.categories.models import Category, Location
from apps.categories.serializers import CategorySerializerList, LocationSerializerList

# Create your views here.
class CategoryAPIViewSet(GenericViewSet,
                         mixins.ListModelMixin,
                         mixins.RetrieveModelMixin,
                         mixins.CreateModelMixin,
                         mixins.UpdateModelMixin,
                         mixins.DestroyModelMixin):
    queryset = Category.objects.all()
    serializer_class = CategorySerializerList

    def get_serializer_class(self):
        if self.action in ['list', 'retrieve']:
            return CategorySerializerList
        return self.serializer_class

    def get_permissions(self):
        if self.action in ['update', 'partial_update', 'destroy', 'create']:
            permission_classes = (IsAdminUser(),)           
        return (AllowAny(), )

class LocationAPIViewSet(GenericViewSet,
                         mixins.ListModelMixin,
                         mixins.RetrieveModelMixin,
                         mixins.CreateModelMixin,
                         mixins.UpdateModelMixin,
                         mixins.DestroyModelMixin):
    queryset = Location.objects.all()
    serializer_class = LocationSerializerList

    def get_permissions(self):
        if self.action in ['update', 'partial_update', 'destroy', 'create']:
            permission_classes = (IsAdminUser(),)           
        return (AllowAny(), )