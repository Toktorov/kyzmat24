from rest_framework.routers import DefaultRouter
from apps.users import views
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView


router = DefaultRouter()
router.register('', views.UserAPIViewSet, basename='users')


urlpatterns = [
    path('user/<int:pk>', views.UserDetailAPIViewSet.as_view(), name = 'user_detail'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('social-login/google/', views.GoogleLogin.as_view(), name='google_login'),
    path('delete/<int:pk>', views.UserDeleteAPIView.as_view(), name = 'user_delete_api'),
    path('update/<int:pk>', views.UserUpdateAPIView.as_view(), name = 'user_update_api'),
]

urlpatterns += router.urls