from django.urls import path
from . import views

urlpatterns = [
    path('api/accommodations/', views.get_accommodations, name='get_accommodations'),
]