from rest_framework import viewsets, generics
from apps.users.models import User, Contact, Media
from apps.users.serializers import (UserSerializer, UserSerializerList, UserDetailSerializer, 
    RegisterSerializer, MyTokenObtainPairSerializer, ContactSerializer, 
    MediaSerializer, UsersSerializer, IssueTokenRequestSerializer,
    TokenSeriazliser, UserUpdateSerializer,
    ChangePasswordSerializer, ContactCreateSerializer, MediaCreateSerializer,
    SendConfirmEmailSerializer,
    )
from rest_framework_simplejwt.views import TokenObtainPairView
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.permissions import AllowAny
from apps.users.permissions import OwnerProfilePermissions, OwnerDeletePermissions
from rest_framework.authentication import BasicAuthentication, TokenAuthentication, SessionAuthentication
from rest_framework.request import Request
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.dispatch import receiver
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import EmailMessage
from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import send_mail 
import random
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.urls import reverse
# Create your views here.

#UserAPI
class UserAPIViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializerList
    permission_classes = [AllowAny]

    def get_serializer_class(self):
        if self.action in ['list', 'retrieve']:
            return UserSerializerList
        return self.serializer_class

class UserDetailAPIViewSet(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer
    permission_classes = [AllowAny]

class Util:
	@staticmethod
	def send_email(data):
		email = EmailMessage(subject=data['email_subject'], body=data['email_body'], to=[data['to_email']])
		email.send()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user_data = serializer.data
        user_uuid = user_data['username']
        user = User.objects.get(email=user_data['email'])
        relativeLink = "/api/users/email-verify/"
        absurl = 'http://'+ 'kyzmat24.com' + relativeLink + user_uuid 
        email_body = 'Добро пожаловать в Kyzmat24! \n' + absurl 
        data = {'email_body': email_body,'to_email': user.email, 'email_subject':'Потвердите свою личность'}
        Util.send_email(data)
        return Response(user_data, status=status.HTTP_201_CREATED)

class SendComfirmEmailView(generics.GenericAPIView):
    # queryset = User.objects.all()
    serializer_class = SendConfirmEmailSerializer
    permission_classes = (AllowAny, )

    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        email = request.data.get('email', '')

        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email, ) 
            user_uuid = user.username
            relativeLink = "/api/users/email-verify/"
            absurl = 'http://'+ 'kyzmat24.com' + relativeLink + user_uuid
            email_body = 'Здраствуйте, \nИспользуйте эту ссылку для верификации своего аккаунта  \n' + \
                absurl
            data = {'email_body': email_body, 'to_email': user.email,
                    'email_subject': 'Потвердите свою личность'}
            Util.send_email(data)
        return Response({'success': 'Успешно отправлено'}, status=status.HTTP_200_OK)

class VerifyEmail(generics.GenericAPIView):
	def get(self, request, pk):
		try:
			user = User.objects.get(username = pk)
			if user:
				user.verifed = True
				user.save()
			return Response({'email':'Успешно верифирован'}, status=status.HTTP_200_OK)
		except User.DoesNotExist:
			return Response({'Неправильное имя пользователя'}, status=status.HTTP_400_BAD_REQUEST)


class GoogleLogin(SocialLoginView):
    authentication_classes = [] # отключить аутентификацию
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
        permission_classes = (AllowAny,)

        def get_object(self, queryset=None):
            obj = self.request.user
            return obj

        def update(self, request, *args, **kwargs):
            self.object = self.get_object()
            serializer = self.get_serializer(data=request.data)

            if serializer.is_valid():
                # Проверить старый пароль
                if not self.object.check_password(serializer.data.get("old_password")):
                    return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
                # set_password также хеширует пароль, который получит пользователь
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
@permission_classes([AllowAny])
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

#ContactAPI
class ContactAPIViewSet(generics.ListAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    permission_classes = [AllowAny]

class ContactUpdateAPIView(generics.UpdateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    permission_classes = [AllowAny]

class ContactDeleteAPIView(generics.DestroyAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    permission_classes = [AllowAny]

class ContactCreateAPIView(generics.CreateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactCreateSerializer
    permission_classes = [AllowAny]


#MediaAPI
class MediaAPIViewSet(generics.ListAPIView):
    queryset = Media.objects.all()
    serializer_class = MediaSerializer
    permission_classes = [AllowAny]

class MediaUpdateAPIView(generics.UpdateAPIView):
    queryset = Media.objects.all()
    serializer_class = MediaSerializer
    permission_classes = [AllowAny]


class MediaDeleteAPIView(generics.DestroyAPIView):
    queryset = Media.objects.all()
    serializer_class = MediaSerializer
    permission_classes = [AllowAny]

class MediaCreateAPIView(generics.CreateAPIView):
    queryset = Media.objects.all()
    serializer_class = MediaCreateSerializer
    permission_classes = [AllowAny]