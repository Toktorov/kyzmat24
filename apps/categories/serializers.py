from rest_framework import serializers

from apps.categories.models import Category, Location


class CategorySerializerList(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id','content')

class LocationSerializerList(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = "__all__"