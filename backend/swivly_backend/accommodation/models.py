from django.db import models
from django.contrib.auth.models import User
from django.conf import settings

class Location(models.Model):
    name = models.CharField(max_length=200)
    city = models.CharField(max_length=100, blank=True)
    state = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.name

class House(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending Approval'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='houses', on_delete=models.CASCADE)
    location = models.ForeignKey(Location, related_name='houses', on_delete=models.CASCADE)
    lodge_name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    number_of_rooms = models.PositiveIntegerField()
    is_available = models.BooleanField(default=False)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    image = models.ImageField(upload_to='houses/%Y/%m/%d', blank=True)
    video = models.FileField(upload_to='houses/videos/%Y/%m/%d', blank=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.lodge_name