from django.contrib import admin
from .models import Brand, Vehicle, Order, ManufacturingProcess, VehicleImage, VehicleColor, Review, Wishlist

class ManufacturingProcessInline(admin.TabularInline):
    model = ManufacturingProcess
    extra = 1

class VehicleImageInline(admin.TabularInline):
    model = VehicleImage
    extra = 1

class VehicleColorInline(admin.TabularInline):
    model = VehicleColor
    extra = 1

@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ('name', 'founded_year')
    search_fields = ('name',)

@admin.register(Vehicle)
class VehicleAdmin(admin.ModelAdmin):
    list_display = ('name', 'brand', 'vehicle_type', 'price', 'is_trending')
    list_filter = ('vehicle_type', 'is_trending', 'brand')
    search_fields = ('name', 'brand__name')
    inlines = [ManufacturingProcessInline, VehicleImageInline, VehicleColorInline]

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'vehicle', 'status', 'order_date')
    list_filter = ('status', 'order_date')
    search_fields = ('user__username', 'vehicle__name')

admin.site.register(Review)
admin.site.register(Wishlist)
