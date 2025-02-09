from django.urls import path
from . import views

app_name = 'product'

urlpatterns = [
    path('api/products/', views.product_list, name='product_list'),
    path('api/products/<int:id>/', views.product_detail, name='product_detail'),
    path('api/categories/', views.category_list, name='category_list'),
    path('api/products/create/', views.create_product, name='create_product'),
]