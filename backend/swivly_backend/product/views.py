from django.http import JsonResponse
from .models import Product, ProductImage

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
            'images': [image.image.url for image in product.images.all()],
        })

    return JsonResponse(product_data, safe=False)