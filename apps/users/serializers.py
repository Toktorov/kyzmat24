from rest_framework import serializers
from apps.users.models import User, Contact, Media
from apps.orders.models import Order
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.authtoken.models import Token
from rest_framework.serializers import Serializer, ModelSerializer, CharField

class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=User.objects.all())]
            )

    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2', 'email', 'phonenumber')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Пароли отличаются"})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            # first_name=validated_data['first_name'],
            # last_name=validated_data['last_name']
        )

        
        user.set_password(validated_data['password'])
        user.save()

        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id', 'username', 'email', 'first_name', 'last_name', 'description',
            'profile_image', 'location', 'another','password',
        )

    def create(self, validated_data):
        password = validated_data['password']
        user = super().create(validated_data)
        user.set_password(password)
        user.save()
        return user

class UsersSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'date_joined']

class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User 
        fields = ('username', 'first_name', 'last_name', 'email', 'description', 'profile_image', 'location', 'another')

class ChangePasswordSerializer(serializers.Serializer):

    """
    Serializer for password change endpoint.
    """
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

class IssueTokenRequestSerializer(Serializer):
    model = User

    username = CharField(required=True)
    password = CharField(required=True)


class TokenSeriazliser(ModelSerializer):

    class Meta:
        model = Token
        fields = ['key']

class ContactSerializer(serializers.ModelSerializer):
    class ContactUserSerializer(serializers.ModelSerializer):

        class Meta:
            model = User
            fields = ('username',)

    user = ContactUserSerializer()
    class Meta:
        model = Contact
        fields = "__all__"

class ContactCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = "__all__"

class MediaSerializer(serializers.ModelSerializer):
    class MediaUserSerializer(serializers.ModelSerializer):

        class Meta:
            model = User
            fields = ('username',)

    user = MediaUserSerializer()
    class Meta:
        model = Media
        fields = "__all__"

class MediaCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Media
        fields = "__all__"


class UserSerializerList(serializers.ModelSerializer):
    contact = ContactSerializer(many=True, source='contact_set.all', read_only=True)
    media = MediaSerializer(many = True,  source='media_set.all', read_only = True)
    class Meta:
        model = User
        fields = (
            'id', 'username', 'first_name', 'last_name', 'email', 'profile_image', 'description', 'location', 'another', 'contact', 'media'
        )


class UserDetailSerializer(serializers.ModelSerializer):
    user_order = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    
    class Meta:
        model = User 
        fields = ('id', 'username', 'description', 'profile_image', 'location', 'another', 'user_order')

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)

        # Добавить пользовательские претензии
        token['username'] = user.username
        return token