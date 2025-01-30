from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    ROLE_CHOICES = [
        ('agent', 'Agent'),
        ('buyer', 'Buyer'),
        ('seller', 'Seller'),
    ]
    password = serializers.CharField(write_only=True)
    role = serializers.ChoiceField(choices=ROLE_CHOICES, required=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'role']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
        )
        # Save the role to the user profile (if you have a custom User model or profile)
        user.role = validated_data['role']
        user.save()
        return user