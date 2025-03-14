from django.http import JsonResponse
from .models import Product, ProductImage, Category
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
import logging
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


def product_list(request):
    page = request.GET.get('page', 1) 
    per_page = request.GET.get('per_page', 6)

    products = Product.objects.filter(available=True).select_related('category', 'user').prefetch_related('images')

    paginator = Paginator(products, per_page)
    try:
        paginated_products = paginator.page(page)
    except PageNotAnInteger:
        # If page is not an integer, deliver the first page
        paginated_products = paginator.page(1)
    except EmptyPage:
        # If page is out of range, deliver the last page
        paginated_products = paginator.page(paginator.num_pages)

    # Prepare the product data
    product_data = []
    for product in paginated_products:
        product_data.append({
            'id': product.id,
            'name': product.name,
            'price': str(product.price),
            'description': product.description,
            'category': product.category.name,
            'user': product.user.username,
            'images': [request.build_absolute_uri(image.image.url) for image in product.images.all()],
        })

    # Return the paginated response
    return JsonResponse({
        'products': product_data,
        'pagination': {
            'current_page': paginated_products.number,
            'total_pages': paginator.num_pages,
            'total_products': paginator.count,
            'per_page': int(per_page),
            'has_next': paginated_products.has_next(),
            'has_previous': paginated_products.has_previous(),
        }
    }, safe=False)

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




from django.contrib.auth import get_user_model

User = get_user_model()
logger = logging.getLogger(__name__)

@csrf_exempt
def create_product(request):
    if request.method == "POST":
        try:
            logger.info("Received POST request to create product")
            logger.info(f"Request POST data: {request.POST}")
            logger.info(f"Request FILES: {request.FILES}")

            data = request.POST
            images = request.FILES.getlist("images")

            # Validate required fields
            required_fields = ["name", "price", "description", "category", "user"]
            for field in required_fields:
                if field not in data:
                    return JsonResponse({"error": f"Missing required field: {field}"}, status=400)

            # Validate category
            try:
                category_id = int(data["category"])
                category = Category.objects.get(id=category_id)
            except (ValueError, Category.DoesNotExist):
                return JsonResponse({"error": "Invalid category"}, status=400)

            # Validate user
            try:
                user_id = int(data["user"])
                user = User.objects.get(id=user_id)
            except (ValueError, User.DoesNotExist):
                return JsonResponse({"error": "Invalid user"}, status=400)

            # Create the product
            product = Product.objects.create(
                name=data["name"],
                price=data["price"],
                description=data["description"],
                category=category,
                user=user,
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