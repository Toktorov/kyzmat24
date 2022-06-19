from dataclasses import field
from rest_framework import serializers
from apps.users.models import User, Contact, Media
from apps.orders.models import AcceptOrder, Order
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.authtoken.models import Token
from rest_framework.serializers import Serializer, ModelSerializer, CharField
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from rest_framework.exceptions import AuthenticationFailed

class RegisterSerializer(serializers.ModelSerializer):
    # email = serializers.EmailField(
    #         required=True,
    #         validators=[UniqueValidator(queryset=User.objects.all())]
    #         )

    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Пароли отличаются"})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            # email=validated_data['email'],
            # first_name=validated_data['first_name'],
            # last_name=validated_data['last_name']
        )

        
        user.set_password(validated_data['password'])
        user.save()

        return user

class SendConfirmEmailSerializer(serializers.Serializer):
    email = serializers.EmailField(
            min_length = 1,
            )

    class Meta:
        model = User 
        fields = ('email', )


class ResetPasswordEmailRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(min_length=2)

    redirect_url = serializers.CharField(max_length=500, required=False)

    class Meta:
        fields = ['email']


class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(
        min_length=6, max_length=68, write_only=True)
    token = serializers.CharField(
        min_length=1, write_only=True)
    uidb64 = serializers.CharField(
        min_length=1, write_only=True)

    class Meta:
        fields = ['password', 'token', 'uidb64']

    def validate(self, attrs):
        try:
            password = attrs.get('password')
            token = attrs.get('token')
            uidb64 = attrs.get('uidb64')

            id = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed('The reset link is invalid', 401)

            user.set_password(password)
            user.save()

            return (user)
        except Exception as e:
            raise AuthenticationFailed('The reset link is invalid', 401)
        return super().validate(attrs)

class ChangePasswordSerializer(serializers.ModelSerializer):
    old_password = serializers.CharField(write_only=True, required=True)
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('old_password', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Поля пароля не совпадают."})

        return attrs

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError({"old_password": "Старый пароль неправильный"})
        return value

    def update(self, instance, validated_data):

        instance.set_password(validated_data['password'])
        instance.save()

        return instance

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
        fields = ('username', 'first_name', 'last_name', 'email', 'description', 'profile_image', 'location', 'another', 'status_user')

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
        fields = ('name', 'file', 'src', 'user')

class AcceptOrderSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = AcceptOrder
        fields = "__all__"

class UserSerializerList(serializers.ModelSerializer):
    contact = ContactSerializer(many=True, source='contact_set.all', read_only=True)
    media = MediaSerializer(many = True,  source='media_set.all', read_only = True)
    orders = AcceptOrderSerializer(many = True, read_only = True)

    class Meta:
        model = User
        fields = (
            'id', 'username', 'first_name', 'last_name', 'email', 'verifed', 'status_user', 'profile_image', 'description', 
            'location', 'another', 'contact', 'media', 'orders'
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