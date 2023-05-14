from rest_framework import serializers

from apps.categories.models import Category, Location
from apps.users.serializers import UserSerializer


class CategorySerializerList(serializers.ModelSerializer):
    category_users = UserSerializer(many=True, read_only=True)
    class Meta:
        model = Category
        fields = ('id','content', 'category_users')

class LocationSerializerList(serializers.ModelSerializer):
    location_users = UserSerializer(many=True, read_only=True)
    class Meta:
        model = Location
        fields = ('id', 'title', 'location_self', 'location_users')