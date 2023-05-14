from rest_framework.viewsets import GenericViewSet
from rest_framework import mixins
from rest_framework.permissions import AllowAny, IsAdminUser
from django_filters.rest_framework import DjangoFilterBackend

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
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ('content', )

    def get_serializer_class(self):
        if self.action in ('list', 'retrieve'):
            return CategorySerializerList
        return self.serializer_class

    def get_permissions(self):
        if self.action in ('update', 'partial_update', 'destroy', 'create'):
            return (IsAdminUser(),)           
        return (AllowAny(), )

class LocationAPIViewSet(GenericViewSet,
                         mixins.ListModelMixin,
                         mixins.RetrieveModelMixin,
                         mixins.CreateModelMixin,
                         mixins.UpdateModelMixin,
                         mixins.DestroyModelMixin):
    queryset = Location.objects.all()
    serializer_class = LocationSerializerList
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ('title', 'location_self')

    def get_permissions(self):
        if self.action in ('update', 'partial_update', 'destroy', 'create'):
            return (IsAdminUser(),)           
        return (AllowAny(), )