from rest_framework import viewsets, generics
from apps.users.models import User, Contact, Media, ConfirmationNumber
from apps.users.serializers import (UserSerializer, UserSerializerList, UserDetailSerializer, 
    RegisterSerializer, MyTokenObtainPairSerializer, ContactSerializer, 
    MediaSerializer, UsersSerializer, IssueTokenRequestSerializer,
    TokenSeriazliser, ConfirmationNumberSerializer, UserUpdateSerializer,
    ChangePasswordSerializer,
    )
from rest_framework_simplejwt.views import TokenObtainPairView
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from django.conf import settings
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.permissions import AllowAny
from apps.users.permissions import OwnerProfilePermissions, OwnerDeletePermissions
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.authentication import BasicAuthentication, TokenAuthentication, SessionAuthentication
from rest_framework.request import Request
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.dispatch import receiver
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created, pre_password_reset
from django.core.mail import send_mail 
import random

# Create your views here.
class UserAPIViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def get_serializer_class(self):
        if self.action in ['list', 'retrieve']:
            return UserSerializerList
        return self.serializer_class

class ConfirmationNumberAPI(generics.CreateAPIView):
    queryset = ConfirmationNumber.objects.all()
    serializer_class = ConfirmationNumberSerializer
    permission_classes = [AllowAny]

class UserDetailAPIViewSet(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer
    permission_classes = [AllowAny]

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]


class GoogleLogin(SocialLoginView):
    authentication_classes = [] # disable authentication
    adapter_class = GoogleOAuth2Adapter
    callback_url = "http://localhost:3000"
    client_class = OAuth2Client

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh',
    ]

    return Response(routes)


class UserUpdateAPIView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserUpdateSerializer
    permission_classes = [AllowAny]

class ChangePasswordView(generics.UpdateAPIView):
        """
        An endpoint for changing password.
        """
        serializer_class = ChangePasswordSerializer
        model = User
        permission_classes = (IsAuthenticated,)

        def get_object(self, queryset=None):
            obj = self.request.user
            return obj

        def update(self, request, *args, **kwargs):
            self.object = self.get_object()
            serializer = self.get_serializer(data=request.data)

            if serializer.is_valid():
                # Check old password
                if not self.object.check_password(serializer.data.get("old_password")):
                    return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
                # set_password also hashes the password that the user will get
                self.object.set_password(serializer.data.get("new_password"))
                self.object.save()
                response = {
                    'status': 'success',
                    'code': status.HTTP_200_OK,
                    'message': 'Password updated successfully',
                    'data': []
                }

                return Response(response)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserDeleteAPIView(generics.DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


    def get(self, request, pk, format=None,):
        content = {
            'Kyzmat24': 'Вы уверены что хотите удалить свой профиль?'
        }
        return Response(content)

    def get_permissions(self):
        if self.request.method == 'DELETE':
            return [OwnerDeletePermissions()]
        return [permission() for permission in self.permission_classes]

class ContactAPIViewSet(generics.ListAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    permission_classes = [IsAuthenticated]

class ContactUpdateAPIView(generics.UpdateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    permission_classes = [IsAuthenticated]


class ContactDeleteAPIView(generics.DestroyAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    permission_classes = [IsAuthenticated]

class MediaAPIViewSet(generics.ListAPIView):
    queryset = Media.objects.all()
    serializer_class = MediaSerializer
    permission_classes = [IsAuthenticated]

class MediaUpdateAPIView(generics.UpdateAPIView):
    queryset = Media.objects.all()
    serializer_class = MediaSerializer
    permission_classes = [IsAuthenticated]


class MediaDeleteAPIView(generics.DestroyAPIView):
    queryset = Media.objects.all()
    serializer_class = MediaSerializer
    permission_classes = [IsAuthenticated]

@api_view(['POST'])
@permission_classes([AllowAny])
def issue_token(request: Request):
    serializer = IssueTokenRequestSerializer(data=request.data)
    if serializer.is_valid():
        authenticated_user = authenticate(**serializer.validated_data)
        try:
            token = Token.objects.get(user=authenticated_user)
        except Token.DoesNotExist:
            token = Token.objects.create(user=authenticated_user)
        return Response(TokenSeriazliser(token).data)
    else:
        return Response(serializer.errors, status=400)

@api_view()
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def user(request: Request):
    return Response({
        'data': UsersSerializer(request.user).data
    })

class MyObtainTokenPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = MyTokenObtainPairSerializer

@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):

    email_plaintext_message = random.randint(100000, 999999)

    # reset_key = random.randint(100000, 999999)

    send_mail(
        # title:
        "Запрос на смену пароля.",
        # message:
        f"Вы (или кто-то от вашего имени) запросил смену пароля для аккаунта {reset_password_token.user.username} (запрос выполнен с IP адреса 217.29.29.13), Для смены пароля пройдите по следующей ссылке: https://kyzmat24.com{email_plaintext_message}. или же введите {email_plaintext_message}",
        # from:
        "noreply@somehost.local",
        # to:
        [reset_password_token.user.email]
    )