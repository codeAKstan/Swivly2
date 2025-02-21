# views.py
from django.http import JsonResponse
from .models import House, Location

def get_accommodations(request):
    accommodations = House.objects.filter(is_available=True).select_related('location').values(
        'id', 'lodge_name', 'description', 'price', 'number_of_rooms', 'image', 'location__name'
    )
    return JsonResponse(list(accommodations), safe=False)