from django.urls import path
from .views import RegisterUserView, LoginView, UserView, UpdateProfileView

urlpatterns = [
    path('register/', RegisterUserView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path("user/", UserView.as_view(), name="user"),
    path("user/update/", UpdateProfileView.as_view(), name="update-profile"),
]
