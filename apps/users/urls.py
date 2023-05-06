from rest_framework.routers import DefaultRouter
from apps.users import views
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView


router = DefaultRouter()
router.register('', views.UserAPIViewSet, 'api_users')
router.register('contact', views.ContactAPIViewSet, 'api_contacts')
router.register('media', views.MediaAPIViewSet, 'api_media')


urlpatterns = [
    #user urls
    path('user/login', views.issue_token, name='issue_token'),
    path('email-verify/<str:pk>', views.VerifyEmail.as_view(), name = "email-verify"),
    path('send-confirm-email/', views.SendComfirmEmailView.as_view(), name = "confirm-email-send"),
    path('change_password/<int:pk>/', views.ChangePasswordView.as_view(), name='auth_change_password'),
    path('request-reset-email/', views.RequestPasswordResetEmail.as_view(), name="request-reset-email"),
    path('password-reset/<uidb64>/<token>/', views.PasswordTokenCheckAPI.as_view(), name='password-reset-confirm'),
    path('password-reset-complete', views.SetNewPasswordAPIView.as_view(), name='password-reset-complete'),
    path('password-reset/', views.SetNewPasswordAPIView.as_view(), name='password-reset-complete'),

]

urlpatterns += router.urls