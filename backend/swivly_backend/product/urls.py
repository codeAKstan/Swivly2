from django.urls import path
from . import views

app_name = 'product'

urlpatterns = [
    path('api/products/', views.product_list, name='product_list'),
    path('api/products/<int:id>/', views.product_detail, name='product_detail'),
    path('api/categories/', views.category_list, name='category_list'),
    # path('categories/<slug:category_slug>/', views.product_list_by_category, name='product_list_by_category'),
    # path('<int:id>/<slug:slug>/', views.product_detail, name='product_detail'),
]