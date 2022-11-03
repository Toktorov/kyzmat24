from rest_framework import viewsets
from apps.categories.models import Category, Location
from apps.categories.serializers import CategorySerializerList, LocationSerializerList
from rest_framework.permissions import AllowAny, IsAdminUser

# Create your views here.
class CategoryAPIViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializerList

    def get_serializer_class(self):
        if self.action in ['list', 'retrieve']:
            return CategorySerializerList
        return self.serializer_class

    def get_permissions(self):
        if self.action in ['update', 'partial_update', 'destroy', 'create']:
            permission_classes = (IsAdminUser,)           
        else :
            permission_classes = (AllowAny, )  
        return [permission() for permission in permission_classes]

class LocationAPIViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializerList

    def get_permissions(self):
        if self.action in ['update', 'partial_update', 'destroy', 'create']:
            permission_classes = (IsAdminUser,)           
        else :
            permission_classes = (AllowAny, )  
        return [permission() for permission in permission_classes]