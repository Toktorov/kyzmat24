from rest_framework import viewsets
from apps.categories.models import Category, Location
from apps.categories.serializers import CategorySerializerList, LocationSerializerList
from rest_framework.permissions import AllowAny

# Create your views here.
class CategoryAPIViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializerList
    permission_classes = [AllowAny]

    def get_serializer_class(self):
        if self.action in ['list', 'retrieve']:
            return CategorySerializerList
        return self.serializer_class

class LocationAPIViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializerList
    permission_classes = [AllowAny]