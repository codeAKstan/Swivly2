from django.contrib.auth.backends import BaseBackend
from django.contrib.auth import get_user_model

User = get_user_model()

class EmailBackend(BaseBackend):
    def authenticate(self, request, email=None, password=None, **kwargs):
        try:
            user = User.objects.get(email=email)
            print(f"User found: {user}")  # Debugging
            if user.check_password(password):
                print("Password is correct")  # Debugging
                return user
            else:
                print("Password is incorrect")  # Debugging
        except User.DoesNotExist:
            print("User does not exist")  # Debugging
            return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None