# views.py
from django.http import JsonResponse
from .models import House, Location
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt

def get_accommodations(request):
    accommodations = House.objects.filter(is_available=True).select_related('location').values(
        'id', 'lodge_name', 'description', 'price', 'number_of_rooms', 'image', 'location__name'
    )
    return JsonResponse(list(accommodations), safe=False)

def get_accommodation_details(request, id):
    try:
        house = House.objects.filter(id=id).select_related('location', 'user').values(
            'id', 'lodge_name', 'description', 'price', 'number_of_rooms', 'image', 'location__name', 'user__username', 'user__phone_number'
        ).first()
        if not house:
            return JsonResponse({"error": "House not found"}, status=404)
        return JsonResponse(house)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    

def get_user_details(request, id):
    try:
        user = User.objects.filter(id=id).values('id', 'username', 'email', 'phone_number').first()
        if not user:
            return JsonResponse({"error": "User not found"}, status=404)
        return JsonResponse(user)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    


def get_locations(request):
    locations = Location.objects.all().values('id', 'name')
    return JsonResponse(list(locations), safe=False)


import logging

logger = logging.getLogger(__name__)

@csrf_exempt
def create_accommodation(request):
    if request.method == "POST":
        try:
            logger.info("Received POST request to create accommodation")
            logger.info(f"Request data: {request.POST}")

            lodge_name = request.POST.get("lodge_name")
            description = request.POST.get("description")
            price = request.POST.get("price")
            number_of_rooms = request.POST.get("number_of_rooms")
            location_id = request.POST.get("location")
            image = request.FILES.get("image")

            logger.info(f"Location ID: {location_id}")
            location = Location.objects.get(id=location_id)

            house = House.objects.create(
                lodge_name=lodge_name,
                description=description,
                price=price,
                number_of_rooms=number_of_rooms,
                location=location,
                image=image,
                user=request.user,  # Assuming the user is authenticated
            )

            logger.info(f"Accommodation created: {house.id}")
            return JsonResponse({"message": "Accommodation created successfully"}, status=201)
        except Exception as e:
            logger.error(f"Error creating accommodation: {str(e)}")
            return JsonResponse({"error": str(e)}, status=400)
    return JsonResponse({"error": "Invalid request method"}, status=405)