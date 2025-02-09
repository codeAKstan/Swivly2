from asyncio.log import logger
from django.http import JsonResponse
from .models import Product, ProductImage, Category
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404


def product_list(request):
    products = Product.objects.filter(available=True).select_related('category', 'user').prefetch_related('images')
    product_data = []

    for product in products:
        product_data.append({
            'id': product.id,
            'name': product.name,
            'price': str(product.price),  # Convert Decimal to string
            'description': product.description,
            'category': product.category.name,
            'user': product.user.username,
            'images': [request.build_absolute_uri(image.image.url) for image in product.images.all()],
        })

    return JsonResponse(product_data, safe=False)

def category_list(request):
    categories = Category.objects.all()
    category_data = [
        {
            'id': category.id,
            'name': category.name,
            'slug': category.slug,
        }
        for category in categories
    ]
    return JsonResponse(category_data, safe=False)

def product_detail(request, id):
    product = get_object_or_404(Product, id=id)
    product_data = {
        'id': product.id,
        'name': product.name,
        'price': str(product.price),
        'description': product.description,
        'category': product.category.name,
        'user': product.user.username,
        'images': [request.build_absolute_uri(image.image.url) for image in product.images.all()],
    }
    return JsonResponse(product_data)





@csrf_exempt
def create_product(request):
    if request.method == "POST":
        try:
            data = request.POST
            images = request.FILES.getlist("images")  # Ensure this is correct

            # Debugging: Log the number of images received
            logger.info(f"Number of images received: {len(images)}")

            # Create the product
            product = Product.objects.create(
                name=data["name"],
                price=data["price"],
                description=data["description"],
                category_id=data["category"],
                user_id=data["user"],
                status="pending",  # Default status is pending
            )

            # Save product images
            for image in images:
                ProductImage.objects.create(product=product, image=image)

            return JsonResponse({"message": "Product created successfully", "product_id": product.id}, status=201)
        except Exception as e:
            logger.error(f"Error creating product: {e}")
            return JsonResponse({"error": str(e)}, status=400)
    return JsonResponse({"error": "Invalid request method"}, status=405)