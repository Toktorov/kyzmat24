from django.db.models import fields
from rest_framework import serializers
from apps.categories.models import Category


class CategorySerializerList(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id','content', 'value')