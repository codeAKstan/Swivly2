"""
URL configuration for swivly_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
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
from django.conf import settings
from django.conf.urls.static import static
from django.middleware.csrf import get_token
from django.http import JsonResponse

def get_csrf_token(request):
    token = get_token(request)
    response = JsonResponse({"csrfToken": token})
    response["Access-Control-Allow-Origin"] = "http://localhost:3000"
    response["Access-Control-Allow-Credentials"] = "true"
    return response

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('registration.urls')),
    path('product/', include('product.urls')),
    path('accommodation/', include('accommodation.urls')),
    path("csrf/", get_csrf_token, name="get_csrf_token"),
]



if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

