from django.contrib.auth import get_user_model
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from .models import Profile
from django.conf import settings

# Use get_user_model() to reference the custom user model
User = get_user_model()

class RegisterUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                "user": serializer.data,
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        print(f"Attempting to log in with email: {email}")  # Debugging

        # Authenticate the user
        user = authenticate(request, username=email, password=password)
        
        if user:
            print(f"User authenticated: {user}")  # Debugging
            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }, status=status.HTTP_200_OK)
        else:
            print("Authentication failed")  # Debugging
            return Response({"message": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        




class UserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        profile_picture_url = user.profile.picture_url if hasattr(user, 'profile') else "/images/default-profile.png"

        return Response({
            "name": user.username,
            "email": user.email,
            "role": user.role,
            "profilePicture": profile_picture_url,
        })
    

from django.conf import settings

class UpdateProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        data = request.data
        files = request.FILES

        # Update user fields
        user.username = data.get("name", user.username)
        user.email = data.get("email", user.email)
        user.role = data.get("role", user.role)
        user.address = data.get("address", user.address)
        user.phone_number = data.get("phoneNumber", user.phone_number)

        # Ensure the user has a profile
        if not hasattr(user, 'profile'):
            Profile.objects.create(user=user)

        # Update profile picture if provided
        if "profilePicture" in files:
            user.profile.picture = files["profilePicture"]
            user.profile.save()

        user.save()

        # Construct the full URL for the profile picture
        profile_picture_url = user.profile.picture.url if user.profile.picture else None
        if profile_picture_url:
            profile_picture_url = request.build_absolute_uri(profile_picture_url)

        return Response({
            "name": user.username,
            "email": user.email,
            "role": user.role,
            "address": user.address,
            "phoneNumber": user.phone_number,
            "profilePicture": profile_picture_url or "/images/default-profile.png",
        }, status=status.HTTP_200_OK)