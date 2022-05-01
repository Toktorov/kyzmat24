from rest_framework.routers import DefaultRouter
from apps.users import views
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView


router = DefaultRouter()
router.register('', views.UserAPIViewSet, basename='users')
router.register('media', views.MediaAPIViewSet, basename='media')
router.register('contact', views.ContactAPIViewSet, basename='contact')


urlpatterns = [
    path('user/<int:pk>', views.UserDetailAPIViewSet.as_view(), name = 'user_detail'),
    path('user/', views.user, name = "user"),
    path('user/login', views.issue_token, name='issue_token'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('social-login/google/', views.GoogleLogin.as_view(), name='google_login'),
    path('delete/<int:pk>', views.UserDeleteAPIView.as_view(), name = 'user_delete_api'),
    path('update/<int:pk>', views.UserUpdateAPIView.as_view(), name = 'user_update_api'),
    path('confirm/', views.ConfirmationNumberAPI.as_view(), name = 'user_confirm_api'),
    path('update_password/<int:pk>', views.ChangePasswordView.as_view(), name = "update_password"),
    path('login/', views.MyObtainTokenPairView.as_view(), name = "example_view"),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),

    #contact
    path('contact/delete/<int:pk>', views.ContactDeleteAPIView.as_view(), name = 'contact_delete_api'),
    path('contact/update/<int:pk>', views.ContactUpdateAPIView.as_view(), name = 'contact_update_api'),

    #media
    path('media/delete/<int:pk>', views.MediaDeleteAPIView.as_view(), name = 'media_delete_api'),
    path('media/update/<int:pk>', views.MediaUpdateAPIView.as_view(), name = 'media_update_api'),
]

urlpatterns += router.urls