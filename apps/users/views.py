from rest_framework import generics
from rest_framework.viewsets import GenericViewSet
from rest_framework import mixins
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from django.dispatch import receiver
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import EmailMessage
from django.core.mail import send_mail 
from django.utils.encoding import smart_str, smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.urls import reverse
from django.http import HttpResponsePermanentRedirect

from apps.users.models import User, Contact, Media
from apps.users import serializers
from apps.users.permissions import UserPermissions, UserMediaContactPermissions


class UserAPIViewSet(GenericViewSet,
                     mixins.ListModelMixin,
                     mixins.RetrieveModelMixin,
                     mixins.CreateModelMixin,
                     mixins.UpdateModelMixin,
                     mixins.DestroyModelMixin):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializerList
    permission_classes = (AllowAny, )

    def get_serializer_class(self):
        if self.action in ('list', 'retrieve'):
            return serializers.UserSerializerList
        if self.action in ('create', ):
            return serializers.RegisterSerializer
        if self.action in ('update', 'partial_update'):
            return serializers.UserUpdateSerializer
        return self.serializer_class

    def get_permissions(self):
        if self.action in ('update', 'partial_update', 'destroy', ):
            return (UserPermissions(), )        
        return (AllowAny(), )
    
    def destroy(self, request, *args, **kwargs):
        user = User.objects.get(pk=self.kwargs['pk'])
        self.check_object_permissions(request, user)
        if user.profile_image:
            user.profile_image.delete()
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class Util:
	@staticmethod
	def send_email(data):
		email = EmailMessage(subject=data['email_subject'], body=data['email_body'], to=[data['to_email']])
		email.send()

class CustomRedirect(HttpResponsePermanentRedirect):

    allowed_schemes = ['https', 'http']

class SendComfirmEmailView(generics.GenericAPIView):
    serializer_class = serializers.SendConfirmEmailSerializer
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

class RequestPasswordResetEmail(generics.GenericAPIView):
    serializer_class = serializers.ResetPasswordEmailRequestSerializer
    permission_classes = (AllowAny, )

    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        email = request.data.get('email', '')

        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            relativeLink = reverse(
                'password-reset-confirm', kwargs={'uidb64': uidb64, 'token': token})

            redirect_url = request.data.get('redirect_url', '')
            absurl = 'http://'+'kyzmat24.com' + relativeLink
            email_body = 'Здрайствуйте, \n Воспользуйтесь ссылкой ниже, чтобы сбросить пароль  \n' + \
                absurl+"?redirect_url="+redirect_url
            data = {'email_body': email_body, 'to_email': user.email,
                    'email_subject': 'Сбросить пароль'}
            Util.send_email(data)
        return Response({'success': 'Мы отправили вам ссылку для сброса пароля'}, status=status.HTTP_200_OK)

class PasswordTokenCheckAPI(generics.GenericAPIView):
    serializer_class = serializers.SetNewPasswordSerializer
    permission_classes = (AllowAny, )

    def get(self, request, uidb64, token):

        redirect_url = request.GET.get('redirect_url')

        try:
            id = smart_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                if len(redirect_url) > 3:
                    return CustomRedirect(redirect_url+'?token_valid=False')
                else:
                    return CustomRedirect('https://kyzmat24.com'+'?token_valid=False')

            if redirect_url and len(redirect_url) > 3:
                return CustomRedirect(redirect_url+'?token_valid=True&message=Credentials Valid&uidb64='+uidb64+'&token='+token)
            else:
                return CustomRedirect('https://kyzmat24.com'+'?token_valid=False')

        except DjangoUnicodeDecodeError as identifier:
            try:
                if not PasswordResetTokenGenerator().check_token(user):
                    return CustomRedirect(redirect_url+'?token_valid=False')
                    
            except UnboundLocalError as e:
                return Response({'error': 'Token is not valid, please request a new one'}, status=status.HTTP_400_BAD_REQUEST)

class SetNewPasswordAPIView(generics.GenericAPIView):
    serializer_class = serializers.SetNewPasswordSerializer
    permission_classes = (AllowAny, )

    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({'success': True, 'message': 'Успешный сброс пароля'}, status=status.HTTP_200_OK)

class ChangePasswordView(generics.UpdateAPIView):
        """
        An endpoint for changing password.
        """
        serializer_class = serializers.ChangePasswordSerializer
        model = User
        permission_classes = (AllowAny,)

        def get_object(self, queryset=None):
            obj = self.request.user
            return obj

        def update(self, request, *args, **kwargs):
            self.object = self.get_object()
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                if not self.object.check_password(serializer.data.get("old_password")):
                    return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
                self.object.set_password(serializer.data.get("password"))
                self.object.save()
                response = {
                    'status': 'success',
                    'code': status.HTTP_200_OK,
                    'message': 'Password updated successfully',
                    'data': []
                }
                return Response(response)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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

@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):

    email_plaintext_message = "{}?token={}".format(reverse('password_reset:reset-password-request'), reset_password_token.key)

    send_mail(
        # title:
        "Запрос на смену пароля.",
        # message:
        f"Вы (или кто-то от вашего имени) запросил смену пароля для аккаунта {reset_password_token.user.username}, Для смены пароля пройдите по следующей ссылке: http://127.0.0.1:7080{email_plaintext_message}. или же введите {email_plaintext_message}",
        # from:
        "noreply@somehost.local",
        # to:
        [reset_password_token.user.email]
    )

#ContactAPI
class ContactAPIViewSet(GenericViewSet,
                     mixins.ListModelMixin,
                     mixins.RetrieveModelMixin,
                     mixins.CreateModelMixin,
                     mixins.UpdateModelMixin,
                     mixins.DestroyModelMixin):
    queryset = Contact.objects.all()
    serializer_class = serializers.ContactSerializer

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            instance = self.perform_create(serializer)
        except ValueError:
            print("Error")
            return Response({"token": "Неавторизованный пользователь"}, status=status.HTTP_400_BAD_REQUEST)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    def get_permissions(self):
        if self.action in ('update', 'partial_update', 'destroy'):
            return (UserMediaContactPermissions(), )
        return (AllowAny(), )

#MediaAPI
class MediaAPIViewSet(GenericViewSet,
                      mixins.ListModelMixin,
                      mixins.RetrieveModelMixin,
                      mixins.CreateModelMixin,
                      mixins.UpdateModelMixin,
                      mixins.DestroyModelMixin):
    queryset = Media.objects.all()
    serializer_class = serializers.MediaSerializer

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)
        
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            instance = self.perform_create(serializer)
        except ValueError:
            print("Error")
            return Response({"token": "Неавторизованный пользователь"}, status=status.HTTP_400_BAD_REQUEST)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    def get_permissions(self):
        if self.action in ('update', 'partial_update', 'destroy'):
            return (UserMediaContactPermissions(), )
        return (AllowAny(), )