# views.py
from django.http import JsonResponse
from .models import House, Location

def get_accommodations(request):
    accommodations = House.objects.filter(is_available=True).select_related('location').values(
        'id', 'lodge_name', 'description', 'price', 'number_of_rooms', 'image', 'location__name'
    )
    return JsonResponse(list(accommodations), safe=False)

def get_accommodation_details(request, id):
    try:
        house = House.objects.filter(id=id).select_related('location').values(
            'id', 'lodge_name', 'description', 'price', 'number_of_rooms', 'image', 'location__name'
        ).first()
        if not house:
            return JsonResponse({"error": "House not found"}, status=404)
        return JsonResponse(house)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)