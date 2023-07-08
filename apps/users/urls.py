from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from apps.users import views


router = DefaultRouter()
router.register('users', views.UserAPIViewSet, 'api_users')
router.register('contact', views.ContactAPIViewSet, 'api_contacts')
router.register('media', views.MediaAPIViewSet, 'api_media')

urlpatterns = [
    #user urls
    path('login/', TokenObtainPairView.as_view(), name='api_login'),
    path('refresh/', TokenRefreshView.as_view(), name='api_token_refresh'),
    path('email-verify/<str:pk>', views.VerifyEmail.as_view(), name = "email-verify"),
    path('send-confirm-email/', views.SendComfirmEmailView.as_view(), name = "confirm-email-send"),
    path('change_password/<int:pk>/', views.ChangePasswordView.as_view(), name='auth_change_password'),
    path('request-reset-email/', views.RequestPasswordResetEmail.as_view(), name="request-reset-email"),
    path('password-reset/<uidb64>/<token>/', views.PasswordTokenCheckAPI.as_view(), name='password-reset-confirm'),
    path('password-reset-complete', views.SetNewPasswordAPIView.as_view(), name='password-reset-complete'),
    path('password-reset/', views.SetNewPasswordAPIView.as_view(), name='password-reset-complete'),

]

urlpatterns += router.urls