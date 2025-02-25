from django.urls import path
from . import views

urlpatterns = [
    path('api/accommodations/', views.get_accommodations, name='get_accommodations'),
    path('api/accommodations/<int:id>/', views.get_accommodation_details, name='get_accommodation_details'),
    path('api/users/<int:userId>/', views.get_user_details, name='get_user_details'),
]