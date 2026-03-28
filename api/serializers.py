from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Brand, Vehicle, Order, ManufacturingProcess, VehicleImage, VehicleColor, Review, Wishlist

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = '__all__'

class ManufacturingProcessSerializer(serializers.ModelSerializer):
    class Meta:
        model = ManufacturingProcess
        fields = '__all__'

class VehicleImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = VehicleImage
        fields = '__all__'

class VehicleColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = VehicleColor
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = Review
        fields = '__all__'

class WishlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wishlist
        fields = '__all__'

class VehicleSerializer(serializers.ModelSerializer):
    brand = BrandSerializer(read_only=True)
    manufacturing_stages = ManufacturingProcessSerializer(many=True, read_only=True)
    images = VehicleImageSerializer(many=True, read_only=True)
    colors = VehicleColorSerializer(many=True, read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)

    class Meta:
        model = Vehicle
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    vehicle = VehicleSerializer(read_only=True)
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Order
        fields = '__all__'
