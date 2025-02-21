from django.contrib import admin
from .models import Location, House

# Register the Location model
@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    list_display = ('name', 'city', 'state')
    search_fields = ('name', 'city', 'state')
    list_filter = ('city', 'state') 

# Register the House model
@admin.register(House)
class HouseAdmin(admin.ModelAdmin):
    list_display = ('lodge_name', 'user', 'location', 'price', 'number_of_rooms', 'is_available', 'status')
    search_fields = ('lodge_name', 'description', 'location__name') 
    list_filter = ('status', 'is_available', 'location') 
    readonly_fields = ('created',)
    fieldsets = (
        ('Basic Information', {
            'fields': ('user', 'location', 'lodge_name', 'description', 'price', 'number_of_rooms')
        }),
        ('Availability and Status', {
            'fields': ('is_available', 'status')
        }),
        ('Media', {
            'fields': ('image', 'video')
        }),
        ('Timestamps', {
            'fields': ('created',)
        }),
    )