from django.core.management.base import BaseCommand
from registration.models import CustomUser, Profile

class Command(BaseCommand):
    help = "Create Profile objects for all existing users"

    def handle(self, *args, **kwargs):
        users = CustomUser.objects.all()
        for user in users:
            if not hasattr(user, 'profile'):
                Profile.objects.create(user=user)
                self.stdout.write(self.style.SUCCESS(f"Created profile for {user.username}"))