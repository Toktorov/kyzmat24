"""service URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth.views import LogoutView
from django.views.generic import TemplateView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from apps.users import views

schema_view = get_schema_view(
    openapi.Info(
        title="Blog API",
        default_version='v1',
        description="Test description",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="nursultandev@gmail.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

api_urlpatterns = [
    path('users/', include('apps.users.urls')),
    path('category/', include('apps.categories.urls')),
    path('order/', include('apps.orders.urls')),
]

urlpatterns = [
    path('', TemplateView.as_view(template_name = 'index.html'), name = "index"),
    path('category/', TemplateView.as_view(template_name = 'index.html')),
    path('search/', TemplateView.as_view(template_name = 'index.html')),
    path('reviews/', TemplateView.as_view(template_name = 'index.html')),
    path('addItem/', TemplateView.as_view(template_name = 'index.html')),
    path('profile/<int:id>', TemplateView.as_view(template_name = 'index.html')),
    path('order-table/', TemplateView.as_view(template_name = 'index.html')),
    path('user/orders', TemplateView.as_view(template_name = 'index.html')),
    path('user/tasks', TemplateView.as_view(template_name = 'index.html')),
    path('user/', TemplateView.as_view(template_name = 'index.html')),
    path('user/home/<int:id>', TemplateView.as_view(template_name = 'index.html'), name = "user_home"),
    path('user/reset-password/reset/', TemplateView.as_view(template_name = 'index.html'), name = "user_password_reset"),
    path('accounts/', include('allauth.urls')),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('admin/', admin.site.urls),
    path('api/', include(api_urlpatterns)),


    # auth
    path('auth/', include('rest_framework.urls')),
    path('api/token/obtain', TokenObtainPairView.as_view(), name='token_obtain'),
    path('api/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),

    # docs
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    # urlpatterns+=static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns+=static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)