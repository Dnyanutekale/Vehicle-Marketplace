from django.db import models
from django.contrib.auth.models import User

class Brand(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    logo = models.ImageField(upload_to='brands/', null=True, blank=True)
    founded_year = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.name

class Vehicle(models.Model):
    TYPE_CHOICES = [
        ('Car', 'Car'),
        ('Bike', 'Bike'),
        ('EV', 'Electric Vehicle'),
        ('Concept', 'Concept Vehicle'),
    ]
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, related_name='vehicles')
    name = models.CharField(max_length=100)
    vehicle_type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    future_expected_price = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    image = models.ImageField(upload_to='vehicles/', null=True, blank=True)
    
    # Specs
    engine = models.CharField(max_length=100, null=True, blank=True)
    mileage_or_range = models.CharField(max_length=100, null=True, blank=True)
    power = models.CharField(max_length=100, null=True, blank=True)
    battery = models.CharField(max_length=100, null=True, blank=True)
    transmission = models.CharField(max_length=100, null=True, blank=True)
    features = models.TextField(help_text="Comma-separated features", null=True, blank=True)
    description = models.TextField()
    
    is_trending = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.brand.name} {self.name}"

class Order(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Confirmed', 'Confirmed'),
        ('In Production', 'In Production'),
        ('Shipped', 'Shipped'),
        ('Delivered', 'Delivered'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE)
    order_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    expected_delivery = models.DateField(null=True, blank=True)
    delivery_address = models.TextField()

    def __str__(self):
        return f"Order {self.id} by {self.user.username}"

class ManufacturingProcess(models.Model):
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, related_name='manufacturing_stages')
    stage_name = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='manufacturing/', null=True, blank=True)
    order_index = models.IntegerField(default=0)

    class Meta:
        ordering = ['order_index']

    def __str__(self):
        return f"{self.vehicle.name} - {self.stage_name}"

class VehicleImage(models.Model):
    vehicle = models.ForeignKey(Vehicle, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='vehicles/gallery/')
    is_primary = models.BooleanField(default=False)
    
    def __str__(self): 
        return f"{self.vehicle.name} Image"

class VehicleColor(models.Model):
    vehicle = models.ForeignKey(Vehicle, related_name='colors', on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    hex_code = models.CharField(max_length=10) # e.g. #FFFFFF
    
    def __str__(self): 
        return f"{self.vehicle.name} - {self.name}"

class Review(models.Model):
    vehicle = models.ForeignKey(Vehicle, related_name='reviews', on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.IntegerField(choices=[(i, str(i)) for i in range(1, 6)])
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self): 
        return f"{self.user.username} - {self.vehicle.name} ({self.rating}/5)"

class Wishlist(models.Model):
    user = models.OneToOneField(User, related_name='wishlist', on_delete=models.CASCADE)
    vehicles = models.ManyToManyField(Vehicle, related_name='wishlisted_by', blank=True)
    
    def __str__(self): 
        return f"{self.user.username}'s Wishlist"

