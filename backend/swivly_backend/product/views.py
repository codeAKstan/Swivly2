from django.http import JsonResponse
from .models import Product, ProductImage, Category

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