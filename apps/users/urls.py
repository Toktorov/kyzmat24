from rest_framework.routers import DefaultRouter
from apps.users import views
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView


router = DefaultRouter()
router.register('', views.UserAPIViewSet, basename='users')


urlpatterns = [
    #user
    path('user/<int:pk>', views.UserDetailAPIViewSet.as_view(), name = 'user_detail'),
    path('user/', views.user, name = "user"),
    path('user/login', views.issue_token, name='issue_token'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('social-login/google/', views.GoogleLogin.as_view(), name='google_login'),
    path('delete/<int:pk>', views.UserDeleteAPIView.as_view(), name = 'user_delete_api'),
    path('update/<int:pk>', views.UserUpdateAPIView.as_view(), name = 'user_update_api'),
    path('login/', views.MyObtainTokenPairView.as_view(), name = "example_view"),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('email-verify/<str:pk>', views.VerifyEmail.as_view(), name = "email-verify"),
    path('send-confirm-email/', views.SendComfirmEmailView.as_view(), name = "confirm-email-send"),
    path('change_password/<int:pk>/', views.ChangePasswordView.as_view(), name='auth_change_password'),
    path('request-reset-email/', views.RequestPasswordResetEmail.as_view(), name="request-reset-email"),
    path('password-reset/<uidb64>/<token>/', views.PasswordTokenCheckAPI.as_view(), name='password-reset-confirm'),
    path('password-reset-complete', views.SetNewPasswordAPIView.as_view(), name='password-reset-complete'),
    path('password-reset/', views.SetNewPasswordAPIView.as_view(), name='password-reset-complete'),


    #contact
    path('contact/', views.ContactAPIViewSet.as_view(), name='contact'),
    path('contact_create/', views.ContactCreateAPIView.as_view(), name='contact_create'),
    path('contact/delete/<int:pk>', views.ContactDeleteAPIView.as_view(), name = 'contact_delete_api'),
    path('contact/update/<int:pk>', views.ContactUpdateAPIView.as_view(), name = 'contact_update_api'),

    #media
    path('media/', views.MediaAPIViewSet.as_view(), name='media'),
    path('media_create/', views.MediaCreateAPIView.as_view(), name='media_create'),
    path('media/delete/<int:pk>', views.MediaDeleteAPIView.as_view(), name = 'media_delete_api'),
    path('media/update/<int:pk>', views.MediaUpdateAPIView.as_view(), name = 'media_update_api'),
]

urlpatterns += router.urls